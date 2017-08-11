import { Header, Main } from 'components';
import React, { Component } from 'react';
import './App.scss';

export default class App extends Component {
  render() {
    return (
      <div className="wraper">
        <Header />
        <Main />
      </div>
    );
  }
}
