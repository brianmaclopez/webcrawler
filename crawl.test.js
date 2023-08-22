const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js')

/* TEST_SECTION:1 normalizeURL function tests */

test('normalizeURL strip protocol', () => {
  inputURL = 'http://blog.boot.dev/path'
  result = 'blog.boot.dev/path'
  expect(normalizeURL(inputURL)).toBe(result);
});

test('normalizeURL no path with trailing "/"', () => {
  inputURL = 'http://blog.boot.dev/'
  result = 'blog.boot.dev'
  expect(normalizeURL(inputURL)).toBe(result);
});

test('normalizeURL no path no trailing "/"', () => {
  inputURL = 'http://blog.boot.dev'
  result = 'blog.boot.dev'
  expect(normalizeURL(inputURL)).toBe(result);
});

test('normalizeURL w/ path, strip trailing "/"', () => {
  inputURL = 'http://blog.boot.dev/path/'
  result = 'blog.boot.dev/path'
  expect(normalizeURL(inputURL)).toBe(result);
});

test('normalizeURL case insensitivity', () => {
  inputURL = 'https://bloG.bOot.dev/path/'
  result = 'blog.boot.dev/path'
  expect(normalizeURL(inputURL)).toBe(result);
});

/* TEST_SECTION:2 getURLsFromHTML function tests */

test('getURLsFromHTML single URL', () => {
  const baseUrl = 'https://blog.boot.dev';
  const htmlString = `
  <html>
  <body>
      <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
  </body>
  </html>
  `
  const urls = [ 'https://blog.boot.dev/' ]
  expect(getURLsFromHTML(htmlString, baseUrl)).toEqual(urls);
})

test('getURLsFromHTML multiple URLs', () => {
  const baseUrl = 'https://blog.boot.dev';
  const htmlString = `
  <html>
  <body>
      <a href="https://Blog.boot.dev"><span>Go to Boot.dev</span></a>
      <p>Just a random lorm ipsum</p>
      <a href="/path1"><span>Go to Boot.dev</span></a>
      <a href="https://blog.boot.dev/path2"><span>Go to Boot.dev</span></a>
  </body>
  </html>
  `
  const urls = [ "https://blog.boot.dev/", "https://blog.boot.dev/path1", "https://blog.boot.dev/path2" ];
  expect(getURLsFromHTML(htmlString, baseUrl)).toEqual(urls);
})

test('getURLsFromHTML handle relative URLs', () => {
  const htmlString = `
  <html>
  <body>
      <a href="/path"><span>Go to Boot.dev</span></a>
  </body>
  </html>
  `
  const baseUrl = 'https://blog.boot.dev'
  const urls = [ 'https://blog.boot.dev/path']
  expect(getURLsFromHTML(htmlString, baseUrl)).toEqual(urls);
})

/* TEST_SECTION3: crawlPage function tests */

// test('crawlPage returns string', () => {
//   const url =   "https://wagslane.dev";
//   expect(typeof crawlPage(url)).toBe('string')
// })

// test('crawlPage prints HTTP error code', () => {
//   const url =   "https://wagslane";
//   expect(crawlPage(url)).toBe('HTTP ERROR: 404');
// })

// test('crawlPage prints Content-Type error code', () => {
//   const url =   "https://wagslane.dev";
//   /* TODO 
//     Content-Type Error if header field not text/html
//   */
//   expect(typeof crawlPage(url)).toBe('COntentTypeErrorCode')
// })