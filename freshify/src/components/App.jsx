import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Login from './Login';
import Signup from './Signup';
import FreshifyHeader from './FreshifyHeader';
import CartPage from './CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for existing auth state
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Persist auth state to localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <CartProvider>
      <Router>
        <div className="bg-light" style={{ minHeight: '100vh' }}>
          <Routes>
            {/* Redirect root path based on auth status */}
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <Navigate to="/home" replace /> : 
                <Navigate to="/login" replace />
              } 
            />
            
            {/* Auth routes - only accessible when not authenticated */}
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
            
            {/* Protected routes - only accessible when authenticated */}
            <Route 
              path="/home" 
              element={
                isAuthenticated ? 
                <FreshifyHeader /> : 
                <Navigate to="/login" replace />
              } 
            />
            
            <Route 
              path="/cart" 
              element={
                isAuthenticated ? 
                <>
                  <FreshifyHeader />
                  <CartPage />
                </> : 
                <Navigate to="/login" replace />
              } 
            />

            {/* Catch-all route for undefined paths */}
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