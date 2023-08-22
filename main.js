// Test on https://wagslane.dev

function main() {
  const argv = process.argv.slice(2);
  if (!argv.length) {
    throw new Error('URL argument not provided\n\tUsage: node main.js <URL>')
  }
  const whatT = typeof 'this';
  console.log(whatT);
}

main();