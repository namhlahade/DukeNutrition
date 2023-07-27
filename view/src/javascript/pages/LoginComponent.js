import React, { useState } from 'react';
import axios from 'axios';
import './../../css/LoginComponent.css';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);
    const response = '';
    try {
      // Send login request to the backend
      response = await axios.post('http://127.0.0.1:5000/authentication/login', { username, password });
      // Handle successful login
      // TODO: Handle JWT token received from backend
      console.log(response); 
    } catch (error) {
      // Handle login error
      console.log(response[0]); 
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );  
};

export default LoginComponent;
