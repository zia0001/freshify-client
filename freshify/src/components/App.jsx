import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Login from './Login';
import Signup from './Signup';
import FreshifyHeader from './FreshifyHeader';
import HomePage from './HomePage';
import CartPage from './CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated && !['/login', '/signup'].includes(location.pathname) && (
        <>
          <FreshifyHeader 
            isAuthenticated={isAuthenticated} 
            setIsAuthenticated={setIsAuthenticated} 
          />
          <div style={{ height: "56px" }}></div>
        </>
      )}
      
      <Routes>
        <Route path="/login" element={
          !isAuthenticated ? (
            <Login setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/home" replace />
          )
        }/>
        
        <Route path="/signup" element={
          !isAuthenticated ? (
            <Signup setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/home" replace />
          )
        }/>
        
        <Route path="/home" element={
          isAuthenticated ? (
            <HomePage />
          ) : (
            <Navigate to="/login" state={{ from: location }} replace />
          )
        }/>
        
        <Route path="/cart" element={
          isAuthenticated ? (
            <CartPage />
          ) : (
            <Navigate to="/login" state={{ from: location }} replace />
          )
        }/>

        <Route path="/" element={
          <Navigate to="/login" replace />
        }/>

        <Route path="*" element={
          <Navigate to="/login" replace />
        }/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
