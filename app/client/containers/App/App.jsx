import { Header, Main } from 'components';
import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from '$redux/store';
import { BrowserRouter } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (

      <Provider store={store}>
        <BrowserRouter>
          <div className="wraper">
            <Header/>
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
