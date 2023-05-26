import React, { useState } from 'react';

const Alert = ({ message, type }) => {
  return <div className={`alert alert-${type}`}>{message}</div>;
};

const SignUp = ({ redirectToHomeContent}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents default form submission behavior

    // Create an object with the data you want to send
    const data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      email: email,
    };

    // Send an HTTP POST request to the backend API endpoint
    fetch('http://127.0.0.1:5000/authentication/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the response from the backend
        if (result.error) {
          setAlert({ type: 'danger', message: result.error });
        } else {
          setAlert({ type: 'success', message: result.message });
          redirectToHomeContent(true);
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          {alert && <Alert message={alert.message} type={alert.type} />}
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Username</label>
              <input
                type="username"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/duke-net-nutrition/sign-in">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
