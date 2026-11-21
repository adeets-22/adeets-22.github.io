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

## Bookshelf sync

The daily `Update Goodreads books` workflow runs `scripts/fetch-books.mjs`.
It follows RSS pages for the `currently-reading` and `read` shelves and keeps
existing editorial exclusions and shelf overrides. The page initially shows
12 read books; its expand button exposes the entire saved read shelf.

Run `node --test scripts/fetch-books.test.mjs` to check the sync safeguards and
`npm run fetch-books` to refresh. HTTP errors, non-RSS responses, malformed
records, repeated pagination, or an unexpectedly empty shelf fail the workflow
without replacing `src/data/books.json`. Both shelves must succeed before the
file is atomically replaced. A deliberately emptied shelf needs its saved data
reviewed before the next refresh.

Recovery note: the saved collection was restored from commit `c97dc06`
(October 27, 2026): 3 currently reading and 85 read books. On November 21,
2026, both public RSS feeds returned HTTP 404 and the book-list page redirected
to sign-in. This snapshot is not evidence of a successful current sync. Check
that the Goodreads profile is publicly accessible and that user ID `166979692`
is still correct, then rerun the workflow. Do not replace the saved collection
with an empty result to make a failed sync appear successful.
