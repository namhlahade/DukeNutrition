import React from 'react'
import '../../css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from '../components/login.component'
import SignUp from '../components/signup.component'
function signup_login({ redirectToHomeContent}) {
  return (
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/sign-in" element={<Login redirectToHomeContent={redirectToHomeContent} />} />
              <Route path="/" element={<SignUp redirectToHomeContent={redirectToHomeContent} />} />
            </Routes>
          </div>
        </div>
      </div>
  )
}
export default signup_login