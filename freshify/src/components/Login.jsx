import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // 👈 initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // here later validate login here with API/auth
    navigate('/header'); //  redirect to Home page
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '350px' }}>
        <h1 className="text-center text-success mb-4">Freshify</h1>
        <h3 className="text-center">Sign In</h3>
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
