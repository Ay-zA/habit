import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Todo.scss';

export default class Todo extends Component {
  static propTypes = {
    onRemove: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
  }

  onRemove() {
    this.props.onRemove(this.props.todo);
  }

  render() {
    return (
      <div className="todo">
        <p className="todo-title">{this.props.todo.title}</p>
        <button className="remove-todo" onClick={:: this.onRemove}>-</button>
      </div>
    );
  }
}
