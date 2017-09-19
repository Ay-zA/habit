import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '$redux/actions/todo.actions';
import './Todos.scss';
import Todo from '../Todo/Todo.jsx';

export class Todos extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    todos: PropTypes.array.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      todo: {
        title: null
      }
    };
  }

  onTitleChange(e) {
    const todo = this.state.todo;
    todo.title = e.target.value;
    this.setState({ todo });
  }

  onAddTodoClick(e) {
    this.props.actions.createTodo(this.state.todo);
    this.setState({
      todo: {
        title: null
      }
    });
    this.inputTitle.value = '';
    this.inputTitle.focus();
  }

  onRemoveTodo(todo) {
    console.log('removingTodo: ', todo);
    this.props.actions.removeTodo(todo);
  }

  renderTodos() {
    return this.props.todos.map(this.createTodo);
  }

  createTodo(todo) {
    return <Todo key={todo._id} todo={todo} onRemove={:: this.onRemoveTodo}></Todo>;
  }

  render() {
    console.log('this.props: ', this.props);
    return (
      <div>
        <h1>Todos</h1>
        {:: this.renderTodos()}
        <input ref={el => {
          this.inputTitle = el;
        }} type="text" onChange={:: this.onTitleChange}/>
        <button type="submit" value="save" onClick={:: this.onAddTodoClick}>
          Add Todo
        </button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
