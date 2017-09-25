import { App } from '../app';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import store from '$redux/store';
import { Provider } from 'react-redux';

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
