import React, { Component } from 'react';
import { Todo } from '../todo';
import { Header } from '../header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Todo></Todo>
      </div>
    );
  }
}
