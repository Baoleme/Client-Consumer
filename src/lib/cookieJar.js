import wepy from 'wepy';

// our implementation of cookiejar, used for manual handling of cookies in http requests
class CookieJar {
  CookieJar () {
    this.initialized = false;
  }

  init () {
    this.data = wepy.getStorageSync('cookies') || {};
    this.initialized = true;
  }

  /**
   * generate cookie string. e.g 'A=a; B=b'
   */
  take () {
    if (!this.initialized) console.warn('cookie jar not initialized');
    return Object.entries(this.data)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');
  }

  /**
   *
   * @param {String} cookie 'Set-Cookie' in response header
   */
  put (cookie) {
    if (!this.initialized) console.warn('cookie jar not initialized');
    cookie
      .split(',')
      .map(s => s.match(/(.+?)=(.+?);/)) // expire time dropped
      .filter(m => !!m)
      .map(m => [m[1], m[2]])
      .forEach(([k, v]) => {
        this.data[k] = v;
      });
    wepy.setStorageSync('cookies', this.data); // use sync version to ensure consistency TODO: any way to avoid use of sync API?
  }
}

export default new CookieJar();
