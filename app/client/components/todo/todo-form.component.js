import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ currentTodo, handleInput, handleAdd, errorMessage }) => (
  <form className="todo__form" onSubmit={handleAdd}>
    <input
      className="todo__form-input"
      type="text"
      placeholder="Add todo..."
      value={currentTodo}
      onChange={handleInput}
    />
    {errorMessage ? <span className="todo__form-error">{errorMessage}</span> : null}
  </form>
);

Todo.propTypes = {
  currentTodo: PropTypes.string,
  handleInput: PropTypes.func,
  handleAdd: PropTypes.func,
  errorMessage: PropTypes.string
};

export default Todo;
