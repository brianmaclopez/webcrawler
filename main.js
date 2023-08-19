const { URL } = require('node:url');

console.log('Hello, Kitty');
inputURL = 'http://blog.boot.dev/'
const urlObj = new URL(inputURL);
console.log(urlObj.hostname);