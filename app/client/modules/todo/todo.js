import React, { Component } from 'react';
import './todo.scss';
// import TodoElement from 'todo.component';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { _id: 1, title: 'Learn JSX', isCompeleted: false },
        { _id: 2, title: 'Learn React', isCompeleted: false },
        { _id: 3, title: 'Learn Webpack', isCompeleted: true }]
    };
  }

  renderTodos() {
    return this.state.todos.map(todo => {
      return (<li key={todo._id} className="todo__item">
        <input className="todo__item-box" defaultChecked={todo.isCompeleted} type="checkbox"/>
        <span className="todo__item-title">{todo.title}</span>
      </li>);
    });
  }

  render() {
    return (
      <div className="todo__container">
        <ul className="todo__list">
          {this.renderTodos()}
        </ul>
        <div className="todo__form">
          <input className="todo__form-input" type="text" placeholder="Add todo..."/>
        </div>
      </div>
    );
  }
}

export default Todo;
