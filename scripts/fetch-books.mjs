// Script to fetch books from Goodreads RSS and save as JSON
// Run with: node scripts/fetch-books.mjs

const GOODREADS_USER_ID = "166979692";
const SHELVES = ["currently-reading", "read"];

async function fetchShelf(shelf) {
  const url = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=${shelf}`;

  try {
    const response = await fetch(url);
    const xml = await response.text();

    // Parse RSS XML (simple regex-based parsing for this use case)
    const items = [];
    const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

    for (const match of itemMatches) {
      const itemXml = match[1];

      // Helper to strip CDATA wrappers
      const stripCdata = (str) => str.replace(/<!\[CDATA\[|\]\]>/g, "").trim();

      const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || "";
      const author = itemXml.match(/<author_name>(.*?)<\/author_name>/)?.[1] || "";
      let imageUrl = itemXml.match(/<book_large_image_url>(.*?)<\/book_large_image_url>/)?.[1]
        || itemXml.match(/<book_image_url>(.*?)<\/book_image_url>/)?.[1] || "";
      let link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] || "";

      // Strip CDATA from URLs
      imageUrl = stripCdata(imageUrl);
      link = stripCdata(link);

      if (title) {
        items.push({
          title: title.trim(),
          author: author.trim(),
          imageUrl,
          link,
        });
      }
    }

    return items;
  } catch (error) {
    console.error(`Error fetching shelf ${shelf}:`, error);
    return [];
  }
}

async function main() {
  console.log("Fetching books from Goodreads...");

  const books = {};

  for (const shelf of SHELVES) {
    console.log(`Fetching ${shelf}...`);
    books[shelf] = await fetchShelf(shelf);
    console.log(`  Found ${books[shelf].length} books`);
  }

  const outputPath = new URL("../src/data/books.json", import.meta.url);

  // Ensure data directory exists
  const fs = await import("fs/promises");
  const path = await import("path");
  const dir = path.dirname(outputPath.pathname);
  await fs.mkdir(dir, { recursive: true });

  await fs.writeFile(outputPath, JSON.stringify(books, null, 2));
  console.log(`\nSaved to ${outputPath.pathname}`);
}

main();
