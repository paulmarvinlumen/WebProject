import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";

const AuthForm = ({ onAuthSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const endpoint = isSignup
      ? "https://localhost:7170/api/auth/signup"
      : "https://localhost:7170/api/auth/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(
          isSignup
            ? "Signup failed. Please check your details." + response.message
            : "Login failed. Please check your credentials." + response.message
        );
      }

      const data = await response.json();
      setMessage(isSignup ? "Signup successful!" : "Login successful!");
      onAuthSuccess(email); // Pass the email to App.jsx
      if (!isSignup) navigate("/welcome");
    } catch (error) {
      setMessage(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>{isSignup ? "Sign Up" : "Log In"}</h1>
      <form onSubmit={handleSubmit} className="signup-form" >
        <InputField
          type="email"
          placeholder="Enter your email"
          icon="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Enter your password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>
      <p style={{ color: message.includes("successful") ? "green" : "red" }}>
        {message}
      </p>
      <p className="login-prompt">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <a href="#" className="login-link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Log In" : "Sign Up"}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;
