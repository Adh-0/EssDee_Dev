import React from 'react';
import { Link } from 'react-router-dom';
import './LandingScreen.css';

const LandingScreen = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to EssDee!</h1>
      <p>Your one-stop shop for all your needs.</p>
      <div className="landing-buttons">
        <Link to="/login" className="button primary">Login</Link>
        <Link to="/register" className="button secondary">Register</Link>
      </div>
    </div>
  );
};

export default LandingScreen;