import React, { useState } from "react";

const Signup = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Signup successful! You can now log in.");
      toggleForm(); // Switch to login form
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="card p-4 shadow" style={{ width: "350px" }}>
      <h3 className="text-center">Sign Up</h3>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" className="form-control mb-2" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="form-control mb-2" onChange={handleChange} required />
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
      <p className="text-center mt-2">
        Already have an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={toggleForm}>Sign In</span>
      </p>
    </div>
  );
};

export default Signup;

