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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for existing auth
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

  useEffect(() => {
    // Set auth status in localStorage whenever it changes
    localStorage.setItem('isAuthenticated', isAuthenticated);
    setIsInitialCheckDone(true);
  }, [isAuthenticated]);

  // Check if current route is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // Don't render anything until initial auth check is done
  if (!isInitialCheckDone) {
    return null; // or a loading spinner
  }

  return (
    <>
      {!isAuthPage && isAuthenticated && (
        <>
          <FreshifyHeader isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <div style={{ height: "56px" }}></div> {/* Navbar spacer */}
        </>
      )}
      
      <Routes>
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
        
        <Route 
          path="/home" 
          element={
            isAuthenticated ? 
            <HomePage /> : 
            <Navigate to="/login" replace state={{ from: location }} />
          } 
        />
        
        <Route 
          path="/cart" 
          element={
            isAuthenticated ? 
            <CartPage /> : 
            <Navigate to="/login" replace state={{ from: location }} />
          } 
        />

        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          } 
        />

        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          } 
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container" style={{ minHeight: '100vh' }}>
          <AppContent />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;