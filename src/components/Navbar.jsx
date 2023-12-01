import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li className='navbar-item'>
          <Link
            to='/'
            className='navbar-link'
          >
            Home
          </Link>
        </li>
        <li className='navbar-item'>
          <Link
            to='/admin-dashboard'
            className='navbar-link'
          >
            Admin Dashboard
          </Link>
        </li>
        <li className='navbar-item'>
          <Link
            to='/login'
            className='navbar-link'
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
