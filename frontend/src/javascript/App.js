
import Login from './pages/login.component';
import SignUp from './pages/signup.component';
import MealRecommendationPage from './pages/MealRecommendationPage';
import SidebarNavigation from './pages/SidebarNavigation';
import UserInfoSurvey from "./pages/UserInfoSurvey";

import { useState } from 'react';
import Button from '@material-ui/core/Button';
import ModalDialog from './components/ModalDialog';
import signup_login from './pages/signup_login';
import React from 'react'
import './../css/bootstrap.css'
import './../css/App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              DukeNetNutrition
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App