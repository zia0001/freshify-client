import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Login from './Login';
import Signup from './Signup';
import FreshifyHeader from './FreshifyHeader';
import HomePage from './HomePage';
import CartPage from './CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // For testing, set this to true initially
    return true;
    // For production:
    // return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <CartProvider>
      <Router>
        {/* Main app container */}
        <div className="app-container" style={{ minHeight: '100vh' }}>
          {/* Render FreshifyHeader outside Routes to show on all pages */}
          <FreshifyHeader />
          
          {/* Empty div to offset the fixed navbar */}
          <div style={{ height: "56px" }}></div>
          
          <Routes>
            {/* Redirect root to /home if authenticated, /login if not */}
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <Navigate to="/home" replace /> : 
                <Navigate to="/login" replace />
              } 
            />
            
            {/* Auth routes */}
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? 
                <Login setIsAuthenticated={setIsAuthenticated} /> : 
                <Navigate to="/home" replace />
              } 
            />
            
            <Route 
              path="/signup" 
              element={
                !isAuthenticated ? 
                <Signup setIsAuthenticated={setIsAuthenticated} /> : 
                <Navigate to="/home" replace />
              } 
            />
            
            {/* Main content routes */}
            <Route 
              path="/home" 
              element={
                isAuthenticated ? 
                <HomePage /> : 
                <Navigate to="/login" replace />
              } 
            />
            
            <Route 
              path="/cart" 
              element={
                isAuthenticated ? 
                <CartPage /> : 
                <Navigate to="/login" replace />
              } 
            />

            {/* Catch-all route */}
            <Route 
              path="*" 
              element={
                <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
              } 
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;