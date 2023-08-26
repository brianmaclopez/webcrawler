// Test on https://wagslane.dev

const { crawlPage, normalizeURL } = require('./crawl');

function main() {
  const argv = process.argv.slice(2);
  if (!argv.length) {
    console.log('provide URL argument');
    process.exit(1);
  }

  if (argv > 1) {
    console.log('To many arguments passed to main');
    process.exit(1);
  }

  console.log(`waiting for crawl page`);
  const pages = {};
  baseUrl = argv[0];
  crawlPage(baseUrl, baseUrl, pages);
  console.log(pages);
}

main();