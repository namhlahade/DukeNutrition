import React from 'react'
import '../../css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LoginForm from '../components/login.component'
import SignUpForm from '../components/signup.component'
function signup_login() {
    const delayRender = (delay) => {
        setTimeout(() => {
           this.setState({ render : !this.state.render })
        }, delay);
      }
      const redirectToHomeContent = (isAuthenticated) => {
        if (isAuthenticated) {
          delayRender(1500);
          window.location.href = '/content'; // Redirect to the homepage
        }
      };
  return (
    <div className="auth-wrapper">
        <div className="auth-inner">
        <Routes>
            <Route
                path="/duke-net-nutrition/sign-in"
                element={<LoginForm redirectToHomeContent={redirectToHomeContent} />}
                />
                <Route
                path="/duke-net-nutrition/sign-up"
                element={<SignUpForm redirectToHomeContent={redirectToHomeContent} />}
                />
        </Routes>
        </div>
    </div>
  )
}
export default signup_login