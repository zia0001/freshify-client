import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";


const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-primary mb-4 fw-bold">freshify</h1>
      {isSignUp ? <Signup toggleForm={() => setIsSignUp(false)} /> : <Login toggleForm={() => setIsSignUp(true)} />}
    </div>
  );
};

export default AuthForm;