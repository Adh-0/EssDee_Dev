import React from 'react';

const RegisterScreen = () => {
  return (
    <div className="register-container">
      <h1>Register</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" placeholder="Confirm password" required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <div className="login-link">
        Have an Account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default RegisterScreen;