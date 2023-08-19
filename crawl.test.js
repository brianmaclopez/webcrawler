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

test('getURLsFromHTML', () => {
  const urls = []
  expect(getURLsFromHTML()).toEqual(urls);
})