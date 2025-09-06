import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">EssDee</div>
        <div className="header__search">
          <input type="text" placeholder="Search EssDee" />
          <button>Search</button>
        </div>
      </div>
      <div className="header__right">
        <nav>
          <ul>
            <li><Link to="/login">Login/Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;