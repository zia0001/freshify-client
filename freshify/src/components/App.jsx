import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Routes>
          {/* Redirect from "/" to "/login" */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Route to Login page */}
          <Route path="/login" element={<Login />} />

          {/* Route to Signup page */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
