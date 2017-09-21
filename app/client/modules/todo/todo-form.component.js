import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ currentTodo, handleInput, onSubmit }) => (
  <form className="todo__form" onSubmit={onSubmit}>
    <input className="todo__form-input" type="text" placeholder="Add todo..." value={currentTodo} onChange={handleInput}/>
  </form>
);

Todo.propTypes = {
  currentTodo: PropTypes.string,
  handleInput: PropTypes.func,
  onSubmit: PropTypes.func
};

export default Todo;
