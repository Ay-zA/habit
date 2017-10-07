import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { todosActions } from '$redux/modules/todos';
import './todo.scss';

import TodoForm from './todo-form.component';
import TodoList from './todo-list.component';

class Todo extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      addTodo: PropTypes.func.isRequired,
      removeTodo: PropTypes.func.isRequired,
      toggleTodo: PropTypes.func.isRequired,
      getTodos: PropTypes.func.isRequired
    }).isRequired,
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isCompleted: PropTypes.boolean
      })
    ).isRequired
  };

  state = {
    currentTodo: '',
    errorMessage: ''
  };

  componentDidMount() {
    this.props.actions.getTodos();
  }

  handleInput = ({ target }) => {
    this.setState({ currentTodo: target.value, errorMessage: '' });
  };

  handleToggle = (_id) => {
    this.props.actions.toggleTodo(_id);
  };

  handleRemove = (_id, e) => {
    e.preventDefault();
    this.props.actions.removeTodo(_id);
  };

  clearInput = () => {
    this.setState({ currentTodo: '' });
  };

  handleEmptyInput = () => {
    this.setState({ errorMessage: 'Please enter some text' });
    this.clearInput();
  };

  handleAdd = (e) => {
    e.preventDefault();
    if (this.state.currentTodo.trim() === '') {
      this.handleEmptyInput();
      return;
    }

    this.props.actions.addTodo({ title: this.state.currentTodo });

    this.clearInput();
  };

  render() {
    return (
      <div className="todo__container">
        <TodoList
          todos={this.props.todos}
          handleRemove={this.handleRemove}
          handleToggle={this.handleToggle}
        />
        <TodoForm
          currentTodo={this.state.currentTodo}
          handleInput={this.handleInput}
          handleAdd={this.handleAdd}
          errorMessage={this.state.errorMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(todosActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
