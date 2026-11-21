import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseLibrary, importLibrary, getCover } from "./import-books.mjs";
const header = 'Book Id,Title,Author,Exclusive Shelf,Date Read,Date Added,Private Notes\n';

test("imports exact shelves, quoted titles, and latest reading dates; ignores notes and other shelves", () => {
  const books = parseLibrary(header + '1,"Title, with comma",Author,read,2026/11/20,2025/01/01,secret\n2,Older,Author,read,2026/10/01,2026/11/21,\n3,Current,Author,currently-reading,,2026/11/21,\n4,Later,Author,to-read,,2026/11/21,');
  assert.equal(books.read[0].title, 'Title, with comma');
  assert.equal(books['currently-reading'].length, 1);
  assert.equal(books.read.length, 2);
  assert.ok(!JSON.stringify(books).includes('secret'));
});

test("rejects malformed CSV, missing columns, duplicates, and empty exports", () => {
  for (const csv of ['<html>Sign in</html>', header, header+'1,,,read,,,', header+'1,One,A,read,,,\n1,One,A,currently-reading,,,', header+'1,"Unclosed']) {
    assert.throws(() => parseLibrary(csv));
  }
});

test("reads actual cover metadata and rejects failed responses", async () => {
  const book = {title:'Test',link:'https://www.goodreads.com/book/show/1'};
  assert.equal(await getCover(book, async()=>({ok:true,text:async()=>'<meta property="og:image" content="https://example.com/cover.jpg?a=1&amp;b=2">'})), 'https://example.com/cover.jpg?a=1&b=2');
  await assert.rejects(getCover(book, async()=>({ok:false,status:503})));
});

test("cover failure preserves snapshot; successful import follows shelf moves without manual overrides", async () => {
  const dir = await mkdtemp(join(tmpdir(), 'books-import-'));
  const output = pathToFileURL(join(dir,'books.json'));
  const old = JSON.stringify({'currently-reading':[{title:'Big Magic',author:'Elizabeth Gilbert',imageUrl:'https://example.com/big.jpg',link:'https://www.goodreads.com/book/show/1'}],read:[]});
  try {
    await writeFile(output,old);
    await assert.rejects(importLibrary(header+'2,New,A,read,2026/11/20,2026/11/20,',output,async()=>({ok:false,status:404})));
    assert.equal(await readFile(output,'utf8'),old);
    const result = await importLibrary(header+'1,Big Magic,Elizabeth Gilbert,read,2026/11/20,2026/11/20,',output);
    assert.deepEqual(result['currently-reading'],[]);
    assert.equal(result.read.length,1);
  } finally { await rm(dir,{recursive:true}); }
});
