const { JSDOM } = require('jsdom');

function getURLsFromHTML(htmlBody, baseUrl) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === '/') {
      try {
        const urlObj = new URL(`${baseUrl}${linkElement.href}`)
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative URL: ${err.message}`);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href)
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with absolute URL: ${err.message}`);
      }     
    }
  }
  return urls;
}

function normalizeURL(URLString) {
  const urlObj = new URL(URLString)
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL, 
  getURLsFromHTML
}