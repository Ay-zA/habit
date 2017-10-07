import HttpService from './http.service';

// TODO: Test It
export default class ApiService extends HttpService {
  debugMode = true;
  apiUri = url => `/api/${url}`;

  apiGet = url =>
    this.get(this.apiUri(url))
      .then(this.httpStatusHelper)
      .then(response => response.json())
      .catch(this.handleError)
      .then(this.handleResponse);

  apiRemove = url =>
    this.remove(this.apiUri(url))
      .then(this.httpStatusHelper)
      .then(response => response.json())
      .catch(this.handleError)
      .then(this.handleResponse);

  apiPost = (url, body) =>
    this.post(this.apiUri(url), body)
      .then(this.httpStatusHelper)
      .then(response => response.json())
      .catch(this.handleError)
      .then(this.handleResponse);

  apiPatch = (url, body) =>
    this.patch(this.apiUri(url), body)
      .then(this.httpStatusHelper)
      .then(response => response.json())
      .catch(this.handleError)
      .then(this.handleResponse);

  handleError = (error, url) => {
    if (this.debugMode) {
      console.error('API error in URL', url, 'Error: ', error); // eslint-disable-line no-console
    }
    throw new Error(error);
  };

  handleResponse = (data) => {
    if (this.debugMode) {
      console.log('Data: ', data); // eslint-disable-line no-console
    }
    return data;
  };
}
