import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup forms

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between Login and Signup
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <Login toggleForm={toggleForm} /> // Pass toggleForm to Login component
      ) : (
        <Signup toggleForm={toggleForm} /> // Pass toggleForm to Signup component
      )}
    </div>
  );
};

export default AuthForm;
