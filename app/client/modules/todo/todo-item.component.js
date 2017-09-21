import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ isCompeleted, title }) => (
    <li className="todo__item">
      <input className="todo__item-box" defaultChecked={isCompeleted} type="checkbox"/>
      <span className="todo__item-title">{title}</span>
    </li>
);

TodoItem.propTypes = {
  isCompeleted: PropTypes.bool,
  title: PropTypes.string
};

export default TodoItem;
