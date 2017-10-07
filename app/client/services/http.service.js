export default class HttpService {
  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  get = url =>
    fetch(url, {
      method: 'GET',
      headers: this.headers
    });

  remove = (url, body) =>
    fetch(url, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(body)
    });

  post = (url, body) =>
    fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    });

  patch = (url, body) =>
    fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body)
    });

  httpStatusHelper = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
  };
}
