const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
  // pages => {}

  console.log(`crawling ${currentURL}...`);

  const baseURLDomain = normalizeURL(baseURL);
  const currentURLDomain = normalizeURL(currentURL);

  if (baseURLDomain !== currentURLDomain) {
    return pages;
  }

  pages[currentURLDomain] = (pages[currentURLDomain]+1) || 1 ;

  try {
    const res = await fetch(currentURL);

    if (res.status > 399) {
      console.log(`ERROR: ${res.status}, at url: ${currentURL}`);
      return
    }

    const contentType = res.headers.get('Content-Type');
    if (!contentType.includes('text/html')) {
      console.log(`ERROR: content-type not text/html, it is ${contentType} instead, at url: ${currentURL}`);
      return
    }

    console.log(await res.status);
    console.log(Object.keys(pages));
    // Make a list of found links
    // call each link on the list recursively.
    return pages // For now
  } catch (err) {
    console.log(`ERROR: ${err.message}, at url ${currentURL}`);
  }
}

function normalizeURL(baseURL) {

  try {
    const urlObj = new URL(baseURL);
    if (urlObj.pathname && urlObj.pathname.slice(-1) == '/') {
      const path = urlObj.pathname.slice(0, -1);
      return `${urlObj.hostname}${path}`
    }
    if (urlObj.pathname) {
      return `${urlObj.hostname}${urlObj.pathname}`;
    }
    return urlObj.hostname;
  } catch (err) {
    console.log(err.message);
  }

}

function getURLsFromHTML(htmlBody, baseURL) {

  const dom = (new JSDOM(htmlBody));
  const linkElements = dom.window.document.querySelectorAll('a');
  const urls = [];

  for (linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === '/') {
      try {
        const url = new URL(linkElement.href, baseURL);
        urls.push(`${url.origin}${url.pathname}`);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        const url = new URL(linkElement.href);
        urls.push(`${baseURL}${url.pathname}`)
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  return urls;
}

module.exports = {
  normalizeURL, 
  getURLsFromHTML, 
  crawlPage
}