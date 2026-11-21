This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Bookshelf updates

Goodreads has retired RSS feeds. Public profiles still work, but
full shelves require sign-in. The old daily RSS workflow has been removed.

To refresh the website, export your library from Goodreads **My Books →
Import and export → Export Library**, then run:

```sh
npm run import-books -- /path/to/goodreads_library_export.csv
npm run test:books
npm run build
```

The importer reads only the currently-reading and read shelves, follows the
export's actual shelf assignments, sorts read books by completion date (falling
back to date added), and reuses existing covers or retrieves covers from public
book pages. It preserves the existing explicitly excluded title. No book is
manually forced into a shelf. It writes the snapshot only after every record
and cover has been processed. Raw CSV exports, notes, and unrelated shelves
must not be committed. Keep exports outside the repository.

Updates require a fresh export; the site does not claim a working automatic
Goodreads sync. The page initially shows 12 read books, with a button to expand
the full collection. Covers are grayscale until hover or keyboard focus.

Current snapshot: exported from Goodreads on November 21, 2026; 5 currently
reading and 86 displayed read books (87 in Goodreads, minus the existing
explicit exclusion).
