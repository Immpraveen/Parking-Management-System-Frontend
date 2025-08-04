import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Home from '../pages/Home';
const Navbar = () => {
  return (
    <nav className='navbaar'>
        <img src={require("../images/logo.jpg") } className="logo" onClick={<Home/>} alt="logo"></img>
      <ul className='navbaaritems'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
