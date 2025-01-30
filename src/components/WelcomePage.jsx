/* import React from "react";

const WelcomePage = ({ email }) => {
  return (
    <div className="welcome-container">
      <h1>Welcome, {email}!</h1>
      <p>You have successfully logged in.</p>
    </div>
  );
};

export default WelcomePage;

 */

import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = ({ email }) => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div className="welcome-page">
      <h1>Welcome, {email}!</h1>
      <p>You have successfully logged in.</p>
      <button
        onClick={handleBackToLogin}
        className="back-button"
        
      >
        Back to Login
      </button>
    </div>
  );
};

export default WelcomePage;