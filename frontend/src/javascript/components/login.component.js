import React, { useState, useEffect } from 'react';

const Alert = ({ message, type }) => {
  return <div className={`alert alert-${type}`}>{message}</div>;
};

const Login = ({ redirectToHomeContent, userIdentification}) => {
  const [alert, setAlert] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState({})

  useEffect(() => {
    console.log(userId)
  }, [userId]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents default form submission behavior

    // Create an object with the data you want to send
    const data = {
      username: username,
      password: password,
    };

    const userIDData = {
      username: username
    }

    // Send an HTTP POST request to the backend API endpoint
    fetch('http://127.0.0.1:5000/authentication/login', {
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
        } 
        
        else {
          setAlert({ type: 'success', message: result.message });

          redirectToHomeContent(true);

          fetch('http://127.0.0.1:5000/authentication/getUserId', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userIDData)
          })
            .then((response) => response.json())
            .then((userIdResult) => {
              // Set the user ID in state
              setUserId(userIdResult);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
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
            <h3>Sign In</h3>

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
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

