"use client";

import { useState } from "react";
import booksData from "@/data/books.json";

interface Book {
  title: string;
  author: string;
  imageUrl: string;
  link: string;
}

interface BooksData {
  "currently-reading": Book[];
  read: Book[];
}

const books = booksData as BooksData;

export default function Bookshelf() {
  const currentlyReading = books["currently-reading"] || [];
  const recentlyRead = books["read"]?.slice(0, 12) || [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {currentlyReading.length > 0 && (
          <div className="md:border-r md:border-[var(--border)] md:pr-6">
            <h3 className="text-sm font-medium mb-3">Currently Reading</h3>
            <div className="flex flex-wrap gap-3">
              {currentlyReading.map((book, i) => (
                <BookCover key={i} book={book} />
              ))}
            </div>
          </div>
        )}

        {recentlyRead.length > 0 && (
          <div className="md:pl-6 mt-6 md:mt-0">
            <h3 className="text-sm font-medium mb-3">Recently Read</h3>
            <div className="flex flex-wrap gap-3">
              {recentlyRead.map((book, i) => (
                <BookCover key={i} book={book} />
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-[var(--accent)]">
        <a
          href="https://www.goodreads.com/user/show/166979692-aditi"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all on Goodreads
        </a>
      </p>
    </div>
  );
}

function BookCover({ book }: { book: Book }) {
  const [imgError, setImgError] = useState(false);

  // Get short title for fallback (first few words)
  const shortTitle = book.title.split(/[:\-–]/)[0].trim().slice(0, 30);

  return (
    <a
      href={book.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      title={`${book.title} by ${book.author}`}
    >
      {book.imageUrl && !imgError ? (
        <img
          src={book.imageUrl}
          alt={book.title}
          width={60}
          height={90}
          className="w-[60px] h-[90px] object-cover rounded-sm shadow-sm grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-300"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-[60px] h-[90px] bg-[#e8ddd0] border border-[var(--border)] rounded-sm flex items-center justify-center p-1">
          <span className="text-[8px] leading-tight text-center text-[var(--foreground)]">
            {shortTitle}
          </span>
        </div>
      )}
    </a>
  );
}
