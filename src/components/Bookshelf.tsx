"use client";

import { useState } from "react";
import booksData from "@/data/books.json";

interface Book {
  title: string;
  author: string;
  imageUrl: string;
  link: string;
}

export default function Bookshelf() {
  const currentlyReading = booksData["currently-reading"];
  const recentlyRead = booksData.read.slice(0, 6);

  return (
    <div className="space-y-8">
      {currentlyReading.length > 0 && (
        <BookShelf title="Currently reading" books={currentlyReading} count={currentlyReading.length} />
      )}
      {recentlyRead.length > 0 && (
        <BookShelf title="Recently read" books={recentlyRead} id="read-books" />
      )}
      <p className="text-sm text-[var(--accent)]">
        <a href="https://www.goodreads.com/user/show/166979692-aditi" target="_blank" rel="noopener noreferrer">
          View my full bookshelf on Goodreads
        </a>
      </p>
    </div>
  );
}

function BookShelf({ title, books, count, id }: { title: string; books: Book[]; count?: number; id?: string }) {
  return (
    <div>
      <div className="mb-5 flex items-baseline gap-3 border-b border-black/20 pb-2">
        <h3 className="text-xl">{title}</h3>
        {count !== undefined && <span className="text-sm text-[var(--accent)]">{count} books</span>}
      </div>
      <ul id={id} className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {books.map((book) => (
          <li key={book.link} className="min-w-0"><BookCover book={book} /></li>
        ))}
      </ul>
    </div>
  );
}

function BookCover({ book }: { book: Book }) {
  const [imgError, setImgError] = useState(false);
  return (
    <a
      href={book.link}
      target="_blank"
      rel="noopener noreferrer"
      className="book-card group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
      title={`${book.title} by ${book.author}`}
      aria-label={`${book.title} by ${book.author}`}
    >
      <div className="mb-3 flex h-32 items-end justify-start sm:h-36">
        {book.imageUrl && !imgError ? (
          // Goodreads supplies external cover images with varying aspect ratios.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.imageUrl}
            alt=""
            width={95}
            height={144}
            className="max-h-full w-auto max-w-full rounded-r-sm object-contain object-bottom shadow-md grayscale transition-[filter,transform] duration-200 group-hover:grayscale-0 group-focus-visible:grayscale-0 motion-safe:group-hover:-translate-y-1"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div aria-hidden="true" className="flex h-full w-24 items-center justify-center rounded-r-sm border border-black/20 bg-[#e8ddd0] p-3 shadow-sm">
            <span className="line-clamp-6 text-center font-serif text-lg leading-snug">{book.title}</span>
          </div>
        )}
      </div>
      <span className="block text-sm font-medium leading-snug group-hover:underline">{book.title.split(/:\s| — /)[0]}</span>
      <span className="mt-1 block text-sm leading-snug text-[var(--accent)]">{book.author}</span>
    </a>
  );
}
