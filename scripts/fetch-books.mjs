// Script to fetch books from Goodreads RSS and save as JSON
// Run with: node scripts/fetch-books.mjs

const GOODREADS_USER_ID = "166979692";
const SHELVES = ["currently-reading", "read"];
const EXCLUDED_TITLES = new Set([
  "I'm So Effing Tired: A Proven Plan to Beat Burnout, Boost Your Energy, and Reclaim Your Life",
]);
const ALWAYS_READ_TITLES = new Set([
  "AI Superpowers: China, Silicon Valley, and the New World Order",
  "The Inner Game of Tennis: The Classic Guide to the Mental Side of Peak Performance",
]);
const CURRENTLY_READING_OVERRIDES = [
  {
    title: "Big Magic: Creative Living Beyond Fear",
    author: "Elizabeth Gilbert",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781594634727-L.jpg",
    link: "https://www.goodreads.com/book/show/24453007-big-magic",
  },
];

// Validate the entire refresh before replacing the last known good snapshot.
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { pathToFileURL } from "node:url";
import { readFile, writeFile, rename } from "node:fs/promises";

const parser = new XMLParser({ ignoreAttributes: false, parseTagValue: false });

export function parseFeed(xml) {
  if (XMLValidator.validate(xml) !== true) throw new Error("Invalid Goodreads XML");
  const channel = parser.parse(xml)?.rss?.channel;
  if (!channel) throw new Error("Goodreads returned a non-RSS response");
  const items = channel.item ? (Array.isArray(channel.item) ? channel.item : [channel.item]) : [];
  return items.map((item) => {
    const text = (key) => String(item[key] ?? "").trim();
    const title = text("title");
    const author = text("author_name");
    const link = text("link");
    if (!title || !author || !/^https:\/\/(www\.)?goodreads\.com\//.test(link)) {
      throw new Error("Incomplete Goodreads book record");
    }
    const imageUrl = text("book_large_image_url") || text("book_image_url");
    return { title, author, imageUrl: /^https?:\/\//.test(imageUrl) ? imageUrl : "", link };
  });
}

export async function fetchShelf(shelf, fetchImpl = fetch) {
  const books = new Map();
  // Continue to an empty page even when Goodreads silently caps per_page.
  for (let page = 1; page <= 100; page++) {
    const url = new URL(`https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}`);
    url.search = new URLSearchParams({ shelf, per_page: "100", page: String(page), sort: "date_read", order: "d" });
    let items;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetchImpl(url, { signal: AbortSignal.timeout(30000) });
        if (!response.ok) throw new Error(`Goodreads ${shelf} page ${page}: HTTP ${response.status}`);
        items = parseFeed(await response.text());
        break;
      } catch (error) {
        if (attempt === 3) throw error;
      }
    }
    if (!items.length) return [...books.values()];
    const previousSize = books.size;
    for (const book of items) books.set(book.link.split("?")[0], book);
    if (books.size === previousSize) throw new Error(`Goodreads repeated ${shelf} page ${page}; refusing a partial sync`);
  }
  throw new Error(`Goodreads ${shelf} exceeded pagination limit`);
}

export async function refreshBooks(outputPath, fetchImpl = fetch) {
  const previous = JSON.parse(await readFile(outputPath, "utf8"));
  const books = {};
  for (const shelf of SHELVES) {
    const fetched = await fetchShelf(shelf, fetchImpl);
    if (!fetched.length && previous[shelf]?.length) {
      throw new Error(`Goodreads unexpectedly emptied ${shelf}; keeping saved books`);
    }
    books[shelf] = fetched.filter((book) => !EXCLUDED_TITLES.has(book.title));
    console.log(`${shelf}: ${books[shelf].length} books`);
  }

  books["currently-reading"] = [
    ...books["currently-reading"],
    ...CURRENTLY_READING_OVERRIDES.filter(
      (override) =>
        !books["currently-reading"].some((book) => book.title === override.title)
    ),
  ];

  const manuallyRead = [
    ...new Map(
      [...books["currently-reading"], ...books.read]
        .filter((book) => ALWAYS_READ_TITLES.has(book.title))
        .map((book) => [book.title, book])
    ).values(),
  ];
  books["currently-reading"] = books["currently-reading"].filter(
    (book) => !ALWAYS_READ_TITLES.has(book.title)
  );
  books.read = [
    ...manuallyRead,
    ...books.read.filter((book) => !ALWAYS_READ_TITLES.has(book.title)),
  ];

  const temporaryPath = new URL(`${outputPath.href}.tmp`);
  await writeFile(temporaryPath, JSON.stringify(books, null, 2) + "\n");
  await rename(temporaryPath, outputPath);
  return books;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  refreshBooks(new URL("../src/data/books.json", import.meta.url)).catch((error) => {
    console.error(`Books sync failed; saved collection was not changed. ${error.message}`);
    process.exitCode = 1;
  });
}
