import wepy from 'wepy';
import jar from './cookieJar';
import { resolve } from 'url';

async function request (arg) {
  const config = typeof arg === 'string' ? { url: arg, method: 'GET' } : arg;

  // insert cookies
  config.header = {
    ...config.header,
    cookie: jar.take()
  };
  config.url = resolve(wepy.$appConfig.baseUrl, config.url);

  const res = await wepy.request(config);

  // handle set-cookies
  const cookieStr = res.header['Set-Cookie'];
  if (cookieStr) jar.put(cookieStr);

  if (res.statusCode >= 400) {
    // not 2xx/3xx code!
    throw res;
  }

  return res;
}

['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
  .map(s => s.toLowerCase())
  .forEach(s => {
    request[s] = arg => {
      const config = typeof arg === 'string' ? { url: arg } : arg;
      return request({
        method: s.toUpperCase(),
        ...config
      });
    };
  });

export default request;
