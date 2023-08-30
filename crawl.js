const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
  // pages => {}
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  const currentURLDomain = normalizeURL(currentURL);
  console.log(`crawling ${currentURL}...`);
  // const baseURLDomain = normalizeURL(baseURL);

  // Base case
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  // pages[currentURLDomain] = (pages[currentURLDomain]+1) || 1 ;
  if (pages.hasOwnProperty(currentURLDomain)) {
    pages[currentURLDomain]++;
    return pages;
  } else if (baseURL === currentURL) {
    pages[currentURLDomain] = 0;
  } else {
    pages[currentURLDomain] = 1;
  }

  try {
    const res = await fetch(currentURL);

    if (res.status > 399) {
      console.log(`ERROR: ${res.status}, at url: ${currentURL}`);
      return pages;
    }

    const contentType = res.headers.get('Content-Type');
    if (!contentType.includes('text/html')) {
      console.log(`ERROR: content-type not text/html, it is ${contentType} instead, at url: ${currentURL}`);
      return pages;
    }

    const urlList = getURLsFromHTML(await res.text(), currentURL);
    // why is my code stuck in an infinite loop?
    urlList.forEach(url => {
      // crawl each url only once
      const urlDom = normalizeURL(url);
      if (!pages.hasOwnProperty(urlDom)) {
        return crawlPage(baseURL, url, pages);
      } else {
        return pages;
      }
    });
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