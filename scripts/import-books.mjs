// Import a Goodreads library CSV export without publishing notes or private fields.
import { parse } from "csv-parse/sync";
import { readFile, writeFile, rename } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const EXCLUDED_TITLES = new Set([
  "I'm So Effing Tired: A Proven Plan to Beat Burnout, Boost Your Energy, and Reclaim Your Life",
]);
const SHELVES = ["currently-reading", "read"];

export function parseLibrary(csv) {
  let headers;
  const rows = parse(csv, { bom: true, skip_empty_lines: true, columns: (names) => {
    headers = names;
    return names;
  } });
  for (const name of ["Book Id", "Title", "Author", "Exclusive Shelf", "Date Read", "Date Added"]) {
    if (!headers?.includes(name)) throw new Error(`Missing Goodreads CSV column: ${name}`);
  }
  if (!rows.length) throw new Error("The export is empty; keeping saved books");
  const seen = new Set();
  const books = { "currently-reading": [], read: [] };
  for (const row of rows) {
    const shelf = row["Exclusive Shelf"];
    if (!SHELVES.includes(shelf)) continue;
    const id = row["Book Id"].trim();
    const title = row.Title.trim();
    const author = row.Author.trim();
    if (!/^\d+$/.test(id) || !title || !author) throw new Error("Incomplete book in Goodreads export");
    if (seen.has(id)) throw new Error(`Duplicate Goodreads book ID: ${id}`);
    seen.add(id);
    if (EXCLUDED_TITLES.has(title)) continue;
    books[shelf].push({ id, title, author, link: `https://www.goodreads.com/book/show/${id}`,
      dateRead: row["Date Read"], dateAdded: row["Date Added"] });
  }
  for (const shelf of SHELVES) {
    books[shelf].sort((a, b) => {
      const date = (book) => shelf === "read" ? book.dateRead || book.dateAdded : book.dateAdded;
      return date(b).localeCompare(date(a), "en", { numeric: true });
    });
  }
  return books;
}

export async function getCover(book, fetchImpl = fetch) {
  const response = await fetchImpl(book.link, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Cover lookup for ${book.title}: HTTP ${response.status}`);
  const html = await response.text();
  // Goodreads' public book pages include an Open Graph cover URL.
  const tag = html.match(/<meta\b[^>]*property=["']og:image["'][^>]*>/i)?.[0];
  const image = tag?.match(/content=["']([^"']+)["']/i)?.[1]?.replaceAll("&amp;", "&");
  if (!image || !/^https:\/\//.test(image)) throw new Error(`Missing cover for ${book.title}`);
  return image;
}

export async function importLibrary(csv, outputPath, fetchImpl = fetch) {
  const parsed = parseLibrary(csv);
  const previous = JSON.parse(await readFile(outputPath, "utf8"));
  const oldBooks = [...previous["currently-reading"], ...previous.read];
  const books = {};
  for (const shelf of SHELVES) {
    books[shelf] = [];
    for (const book of parsed[shelf]) {
      const existing = oldBooks.find((old) =>
        old.link.match(/\/book\/show\/(\d+)/)?.[1] === book.id ||
        (old.title === book.title && old.author === book.author));
      const imageUrl = existing?.imageUrl || await getCover(book, fetchImpl);
      books[shelf].push({ title: book.title, author: book.author, imageUrl, link: book.link });
    }
  }
  const temporaryPath = new URL(`${outputPath.href}.tmp`);
  await writeFile(temporaryPath, JSON.stringify(books, null, 2) + "\n");
  await rename(temporaryPath, outputPath);
  console.log(`Imported ${books["currently-reading"].length} currently reading and ${books.read.length} read books.`);
  return books;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const input = process.argv[2];
  if (!input) {
    console.error("Usage: npm run import-books -- /path/to/goodreads_library_export.csv");
    process.exitCode = 1;
  } else {
    readFile(input, "utf8")
      .then((csv) => importLibrary(csv, new URL("../src/data/books.json", import.meta.url)))
      .catch((error) => {
        console.error(`Import failed; saved collection was not changed. ${error.message}`);
        process.exitCode = 1;
      });
  }
}
