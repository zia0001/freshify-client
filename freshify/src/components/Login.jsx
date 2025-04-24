import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {  // 👈 Add setIsAuthenticated prop
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Here you would typically call your authentication API
    // For demo purposes, we'll simulate successful login
    try {
      // await authAPI.login(formData);
      setIsAuthenticated(true);
      navigate('/home');  // 👈 Changed from '/header' to '/home'
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '350px' }}>
        <h1 className="text-center text-success mb-4">Freshify</h1>
        <h3 className="text-center">Sign In</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-success w-100">
            Sign In
          </button>
        </form>
        <p className="text-center mt-2">
          Don't have an account?{' '}
          <Link to="/signup" className="text-success" style={{ cursor: 'pointer' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;