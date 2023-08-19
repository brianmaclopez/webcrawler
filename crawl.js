function normalizeURL(baseURL) {
  /*
    The following should all normalize
    https://blog.boot.dev/path/
    https://BLOG.boot.dev/path
    http://blog.boot.dev/path/
    http://blog.boot.dev/path
  */

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

module.exports = {
  normalizeURL
}