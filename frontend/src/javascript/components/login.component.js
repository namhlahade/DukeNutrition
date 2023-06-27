import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAuth } from "../context/AuthProvider";

const Alert = ({ message, type }) => {
  return <div className={`alert alert-${type}`}>{message}</div>;
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    login({ username, password, alert });
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
                  id="persist"
                  // onChange={togglePersist}
                  // checked={persist}
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
