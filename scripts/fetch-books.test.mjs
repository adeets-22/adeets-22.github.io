import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseFeed, fetchShelf, refreshBooks } from "./fetch-books.mjs";

const item = (id) => `<item><title><![CDATA[Book ${id} & friends]]></title><author_name>A &amp; B</author_name><link>https://www.goodreads.com/review/show/${id}</link><book_large_image_url><![CDATA[https://example.com/${id}.jpg]]></book_large_image_url></item>`;
const feed = (items = "") => `<rss><channel><title>My books</title>${items}</channel></rss>`;
const response = (xml) => ({ ok: true, text: async () => xml });

test("parses CDATA, entities, singleton and empty RSS", () => {
  const [book] = parseFeed(feed(item(1)));
  assert.equal(book.title, "Book 1 & friends");
  assert.equal(book.author, "A & B");
  assert.equal(book.imageUrl, "https://example.com/1.jpg");
  assert.deepEqual(parseFeed(feed()), []);
  assert.throws(() => parseFeed("<html>Unavailable</html>"));
  assert.throws(() => parseFeed("<rss><channel>"));
  assert.throws(() => parseFeed(feed("<item><title>Missing fields</title></item>")));
});

test("paginates beyond a short page and deduplicates overlapping records", async () => {
  const pages = [feed(item(1)), feed(item(1) + item(2)), feed()];
  const result = await fetchShelf("read", async (url) => response(pages[Number(url.searchParams.get("page")) - 1]));
  assert.equal(result.length, 2);
});

test("rejects HTTP errors and repeated pages", async () => {
  await assert.rejects(fetchShelf("read", async () => ({ ok: false, status: 404 })), /HTTP 404/);
  await assert.rejects(fetchShelf("read", async () => response(feed(item(1)))), /repeated/);
});

test("failed, empty, or partially fetched refresh never overwrites saved collection", async () => {
  const directory = await mkdtemp(join(tmpdir(), "books-test-"));
  const output = pathToFileURL(join(directory, "books.json"));
  const original = JSON.stringify({ "currently-reading": [{ title: "Saved" }], read: [{ title: "Saved" }] });
  try {
    for (const fetchImpl of [
      async () => ({ ok: false, status: 404 }),
      async () => response(feed()),
      async (url) => url.searchParams.get("shelf") === "read"
        ? ({ ok: false, status: 503 })
        : response(feed(url.searchParams.get("page") === "1" ? item(1) : "")),
    ]) {
      await writeFile(output, original);
      await assert.rejects(refreshBooks(output, fetchImpl));
      assert.equal(await readFile(output, "utf8"), original);
    }
    await refreshBooks(output, async (url) => response(feed(url.searchParams.get("page") === "1" ? item(url.searchParams.get("shelf") === "read" ? 2 : 1) : "")));
    const saved = JSON.parse(await readFile(output, "utf8"));
    assert.equal(saved.read.length, 1);
    assert.equal(saved["currently-reading"].length, 2); // Includes the existing manual override.
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
