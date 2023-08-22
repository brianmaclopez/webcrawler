// Test on https://wagslane.dev

const { crawlPage, normalizeURL } = require('./crawl');

async function main() {
  const argv = process.argv.slice(2);
  if (!argv.length) {
    throw new Error('URL argument not provided\n\tUsage: node main.js <URL>')
  }
  
  const response = await crawlPage(argv[0]);
  console.dir(response);
}

main();