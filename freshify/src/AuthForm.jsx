import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-primary mb-4 fw-bold">freshify</h1>
      
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center">{isSignUp ? "Sign Up" : "Sign In"}</h3>
        <form>
          {isSignUp && (
            <input type="text" placeholder="Name" className="form-control mb-2" required />
          )}
          <input type="email" placeholder="Email" className="form-control mb-2" required />
          <input type="password" placeholder="Password" className="form-control mb-2" required />
          <button type="submit" className="btn btn-primary w-100">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="text-center mt-2">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
