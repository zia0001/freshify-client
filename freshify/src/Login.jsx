import React, { useState } from "react";

const Login = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      alert("Login successful!");
      localStorage.setItem("token", data.token); // Save token for authentication
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="card p-4 shadow" style={{ width: "350px" }}>
      <h3 className="text-center">Sign In</h3>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="form-control mb-2" onChange={handleChange} required />
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>
      <p className="text-center mt-2">
        Don't have an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={toggleForm}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;
