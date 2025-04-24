import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

const Signup = ({ setIsAuthenticated }) => {  // 👈 Add setIsAuthenticated prop
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  // ... (keep all your existing validation functions)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched for validation
    const allTouched = {
      name: true,
      email: true,
      phone: true,
      password: true,
    };
    setTouched(allTouched);

    validateField('name', formData.name);
    validateField('email', formData.email);
    validateField('password', formData.password);
    validateField('phone', formData.phone);

    if (Object.values(errors).some((msg) => msg)) return;

    try {
      // Here you would call your actual signup API
      // await authAPI.signup(formData);
      
      // For demo purposes, we'll simulate successful signup
      setIsAuthenticated(true);
      navigate('/home');
    } catch (err) {
      setApiError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '350px' }}>
        <h1 className="text-center text-success mb-4">Freshify</h1>
        <h3 className="text-center">Sign Up</h3>
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        <form onSubmit={handleSubmit}>
          {/* ... (keep all your existing form fields) */}
        </form>
        <p className="text-center mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-success">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;