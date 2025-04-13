import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRegex = /^[a-zA-Z][a-zA-Z0-9_]*(\s[a-zA-Z0-9_]+)?$/;
  const emailRegex = /^[a-zA-Z][\w.-]*@[a-zA-Z]+\.(com|org|net|edu)$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  const validateField = (name, value) => {
    let message = '';

    if (value.trim() === '') {
      message = '';
    } else {
      switch (name) {
        case 'name':
          if (!nameRegex.test(value.trim())) {
            message = 'Name must start with a letter';
          }
          break;
        case 'email':
          if (!emailRegex.test(value.trim())) {
            message = 'Please enter a valid email address';
          }
          break;
        case 'password':
          if (!passwordRegex.test(value)) {
            message = 'Password must be 8+ chars, with uppercase, lowercase & special char';
          }
          break;
        case 'phone':
          if (!phoneRegex.test(value)) {
            message = 'Enter a valid phone number (10-15 digits)';
          }
          break;
        default:
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));

    if (touched.phone) {
      validateField('phone', value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

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

    const result = await dispatch(signupUser(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  return (
    <div className="card p-4 shadow" style={{ width: '350px' }}>
      <h3 className="text-center">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={`form-control mb-2 ${errors.name ? 'is-invalid' : ''}`}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touched.name && errors.name && (
          <div className="text-danger mb-2">{errors.name}</div>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`form-control mb-2 ${errors.email ? 'is-invalid' : ''}`}
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touched.email && errors.email && (
          <div className="text-danger mb-2">{errors.email}</div>
        )}

        {/* Phone */}
        <PhoneInput
          country={'pk'}
          value={formData.phone}
          onChange={handlePhoneChange}
          inputClass={`form-control mb-2 ${errors.phone ? 'is-invalid' : ''}`}
          enableSearch
          inputStyle={{ width: '100%' }}
          onBlur={() => {
            setTouched((prev) => ({ ...prev, phone: true }));
            validateField('phone', formData.phone);
          }}
        />
        {touched.phone && errors.phone && (
          <div className="text-danger mb-2">{errors.phone}</div>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={`form-control mb-2 ${errors.password ? 'is-invalid' : ''}`}
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touched.password && errors.password && (
          <div className="text-danger mb-2">{errors.password}</div>
        )}

        <button type="submit" className="btn btn-success w-100">Sign Up</button>
      </form>

      <p className="text-center mt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-success">Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
