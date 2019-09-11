import { translateResponseMessage } from './response-helper';

export default function fetchPlus(url, options = { method: 'GET' }) {
  let timezoneOffset = new Date().getTimezoneOffset();
  const sign = timezoneOffset < 0 ? '+' : '-'; // yes, this is the opposite as expected
  timezoneOffset = Math.abs(timezoneOffset) / 60;

  let headers = {
    'Content-Type': 'application/json',
    'X-Timezone-Offset': `${sign}${timezoneOffset}`,
  };

  if (options.method.toLowerCase() !== 'get') {
    const csrfToken = document.getElementsByName('csrf-token')[0].content;

    headers = Object.assign(headers, {
      'X-CSRF-Token': csrfToken,
    });
  }

  headers = new Headers(headers);

  let _res;

  return fetch(url, { headers, ...options })
    .then((res) => {
      _res = res;

      if (res.headers.get('content-type').indexOf('application/json') !== -1) {
        return res.json();
      }

      throw (Error('Response from server should be JSON.'));
    })
    .then((json) => {
      const {
        message, detail, error,
      } = json;

      let translatedMessage = null;

      if (message || error) {
        translatedMessage = translateResponseMessage(message || error);
      }

      return {
        error, detail, message: translatedMessage, json, res: _res, status: _res.status,
      };
    })
    .catch((e) => {
      throw (e);
    });
}
