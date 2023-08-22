const { JSDOM } = require('jsdom')

function crawlPage(url) {
  async function getData(url) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    return response.json()
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