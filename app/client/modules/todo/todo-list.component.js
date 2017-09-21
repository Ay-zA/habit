import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './todo-item.component';

const TodoList = ({ todos }) => (
  <ul className="todo__list">
    {todos.map(todo => <TodoItem key={todo._id} title={todo.title} isCompeleted={todo.isCompeleted}/>)}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.array
};

export default TodoList;
