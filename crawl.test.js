const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

/* TEST_SUITE:1 normalizeURL function tests */

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

/* TEST_SUITE:2 getURLsFromHTML function tests */

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
      <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
      <a href="https://blog.boot.dev/path1"><span>Go to Boot.dev</span></a>
      <a href="https://blog.boot.dev/path2"><span>Go to Boot.dev</span></a>
  </body>
  </html>
  `
  const urls = [ "https://blog.boot.dev/", "https://blog.boot.dev/path1", "https://blog.boot.dev/path2" ];
  expect(getURLsFromHTML(htmlString, baseUrl)).toEqual(urls);
})

test('getURLsFromHTML normalize relative URLs', () => {
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