import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import FreshifyHeader from './FreshifyHeader';
import GroceryDisplay from './GroceryDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      {/* Remove the fixed height container that was preventing scrolling */}
      <div className="bg-light">
        <Routes>
          {/* Redirect from "/" to "/login" */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Route to Login page */}
          <Route path="/login" element={<Login />} />

          {/* Route to Signup page */}
          <Route path="/signup" element={<Signup />} />

          {/* Route to FreshifyHeader */}
          <Route path="/header" element={<FreshifyHeader />} />

          {/* Route to GroceryDisplay */}
          <Route path="/grocery" element={<GroceryDisplay />} />
          
          {/* New route for complete view */}
          <Route path="/home" element={<FreshifyHeader />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;