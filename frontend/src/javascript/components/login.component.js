import React from 'react';
import useAuth from '../hooks/useAuth';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Alert = ({ message, type }) => {
  return <div className={`alert alert-${type}`}>{message}</div>;
};

const Login = () => {
  const [alert, setAlert] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents default form submission behavior

    // Create an object with the data you want to send
    const data = {
      username: username,
      password: password,
    };

    // Send an HTTP POST request to the backend API endpoint
    fetch('http://127.0.0.1:5000/authentication/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      body: JSON.stringify(data),
    })
      .then((response) => response.json()) // The first .then() handles the raw HTTP response from the server.
      .then((data) => {
        // Handle the response from the backend
        if (data.error) {
          setAlert({ type: 'danger', message: data.error });
        } else {
          setAlert({ type: 'success', message: data.message });
          const accessToken = data.accessToken;
          const roles = data.role; //user code
          console.log(data.accessToken);
          console.log(data.role);
          console.log(data.message);
          setAuth({ username, password, roles, accessToken });
          setUsername('');
          setPassword('');
          //redirectToHomeContent(true);
          navigate(from, { replace: true });
        }
      }) // The second .then() handles the parsed JSON data extracted from the response.
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  };

  const togglePersist = () => {
      setPersist(prev => !prev);
  }

  useEffect(() => {
      localStorage.setItem("persist", persist);
  }, [persist])

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
                  id="persist"
                  onChange={togglePersist}
                  checked={persist}
                />
                <label className="custom-control-label" htmlFor="persist">
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
          <p className="forgot-password text-left">
                Need an Account?{' '}
                <span className="line">
                    <Link to="/duke-net-nutrition/sign-up">Sign Up</Link>
                </span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
