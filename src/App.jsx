
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import WelcomePage from "./components/WelcomePage";

const App = () => {
  const [email, setEmail] = useState("");

  return (
    <Routes>
      {/* Login or Signup */}
      <Route
        path="/"
        element={<AuthForm onAuthSuccess={(userEmail) =>  setEmail(userEmail) } />}
      />
      {/* Welcome Page */}
      <Route
        path="/welcome"
        element={email ? <WelcomePage email={email} /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;

