import React, { Component } from 'react';
import './todo.scss';

import TodoForm from './todo-form.component';
import TodoList from './todo-list.component';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          _id: 1,
          title: 'Learn JSX',
          isCompeleted: false
        }, {
          _id: 2,
          title: 'Learn React',
          isCompeleted: false
        }, {
          _id: 3,
          title: 'Learn Webpack',
          isCompeleted: true
        }
      ],
      currentTodo: '',
      nextId: 4
    };
  }

  handleInput({ target }) {
    this.setState({ currentTodo: target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let newTodo = {
      _id: this.nextId(),
      title: this.state.currentTodo,
      isCompeleted: false
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  nextId() {
    this.setState({ nextId: this.state.nextId + 1 });
    return this.state.nextId;
  }

  render() {
    return (
      <div className="todo__container">
        <TodoList todos={this.state.todos}/>
        <TodoForm currentTodo={this.state.currentTodo} handleInput={::this.handleInput} onSubmit={::this.onSubmit} />
      </div>
    );
  }
}

export default Todo;
