import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header className="nav-bar">
    <nav>
      <h1 className="app-title">MERN Stack</h1>
      <ul>
        <li>
          <NavLink exact to='/' activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to='/about' activeClassName="active">About</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
