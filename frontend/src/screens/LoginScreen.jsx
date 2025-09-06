import React from 'react';

const LoginScreen = () => {
  return (
    <div className="login-container">
      <h1>Sign In</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" required />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
      <div className="register-link">
        New Customer? <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default LoginScreen;