import React, { useState, useEffect } from 'react';
import './App.css';
import Apps from './components/Header';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState({}); // State to store registered users

  const emailRegex = /^[a-z0-9]+@gmail\.com$/;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email. Use lowercase letters and numbers only, ending with @gmail.com.");
      return;
    }
    if (password === '') {
      setErrorMessage("Password cannot be empty.");
      return;
    }
    if (!registeredUsers[email] || registeredUsers[email] !== password) {
      setErrorMessage("New user, please sign up your account.");
      return;
    }
    setIsSignedIn(true);
  };

  const validateSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email. Use lowercase letters and numbers only, ending with @gmail.com.");
      return;
    }else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }else{
      setRegisteredUsers((prevUsers) => ({ ...prevUsers, [email]: password }));
      handleSignUp();
    }
};

const handleSignUp = async() =>{
  try {
    var data={
      email: email,
      password: password
    }
  const response = await fetch('http://localhost:5000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  setShowSuccessMessage(true);
  setShowSignUp(false);
  setIsSignedIn(false);
  setEmail('');
  setPassword('');
  setConfirmPassword('');
} catch (error) {
  console.error('Error sending data:', error);
}
}

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
    setShowSuccessMessage(false);
    setErrorMessage('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  if (isSignedIn) {
    return <Apps />;
  }

  return (
    <div className="container">
      {!showSignUp ? (
        <form className="login-container" onSubmit={handleLogin}>
          <h2>Login Page</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-box"
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-box"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
          <button type="submit" className="login-button">Login</button>
          {errorMessage && <p className="error-text">{errorMessage}</p>}
          <p className="info-text">Don’t have an account? Create a new one!</p>
          <button type="button" onClick={toggleSignUp} className="signup-button">Sign Up</button>
        </form>
      ) : (
        <form className="signup-container" onSubmit={validateSignUp}>
          <h2>Sign Up Page</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-box"
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-box"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-box"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "🙈"}
            </button>
          </div>
          <button type="submit" className="signin-button">Sign Up</button>
          {errorMessage && <p className="error-text">{errorMessage}</p>}
        </form>
      )}
      {showSuccessMessage && (
        <div className="success-message">
          User successfully signed up! Please log in.
        </div>
      )}
    </div>
  );
};

export default App; 