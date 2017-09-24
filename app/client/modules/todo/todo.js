import React, { Component } from 'react';
import './todo.scss';

import TodoForm from './todo-form.component';
import TodoList from './todo-list.component';

class Todo extends Component {
  state = {
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
    errorMessage: '',
    nextId: 4
  };

  handleInput({ target }) {
    this.setState({ currentTodo: target.value, errorMessage: '' });
  }

  removeTodo(_id, todos) {
    const todoIndex = todos.findIndex(_ => _._id === _id);
    if (todoIndex === -1) {
      return;
    }

    let newTodo = [
      ...todos.slice(0, todoIndex),
      ...todos.slice(todoIndex + 1)
    ];
    return newTodo;
  }

  toggleTodo(todo) {
    return {
      ...todo,
      isCompeleted: !todo.isCompeleted
    };
  }

  updateTodos(list, updated) {
    const updatedIndex = list.findIndex(item => item._id === updated._id);
    return [
      ...list.slice(0, updatedIndex),
      updated,
      ...list.slice(updatedIndex + 1)
    ];
  }

  handleToggle(_id) {
    const todo = this.state.todos.find(item => item._id === _id);
    if (!todo) {
      return;
    }

    const newTodo = this.toggleTodo(todo);
    const updatedTodos = this.updateTodos(this.state.todos, newTodo);
    this.setState({ todos: updatedTodos });
  }

  handleRemove(id, e) {
    e.preventDefault();
    let { todos } = this.state;
    let newTodos = this.removeTodo(id, todos);
    console.log(todos === newTodos);
    this.setState({ todos: newTodos });
  }

  clearInput() {
    this.setState({ currentTodo: '' });
  }

  handleEmptyInput() {
    this.setState({ errorMessage: 'Please enter some text' });
    this.clearInput();
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.currentTodo.trim() === '') {
      this.handleEmptyInput();
      return;
    }

    let newTodo = {
      _id: this.nextId(),
      title: this.state.currentTodo.trim(),
      isCompeleted: false
    };
    this.setState({
      todos: [
        ...this.state.todos,
        newTodo
      ]
    });

    this.clearInput();
  }

  nextId() {
    this.setState({
      nextId: this.state.nextId + 1
    });
    return this.state.nextId;
  }

  render() {
    return (
      <div className="todo__container">
        <TodoList todos={this.state.todos} handleRemove={:: this.handleRemove} handleToggle={:: this.handleToggle}/>
        <TodoForm currentTodo={this.state.currentTodo} handleInput={:: this.handleInput} onSubmit={:: this.onSubmit} errorMessage={this.state.errorMessage}/>
      </div>
    );
  }
}

export default Todo;
