import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WebContent from './pages/WebContent';
import LoginForm from './components/login.component';
import SignUpForm from './components/signup.component';
import SignUpLogin from './pages/signup_login';
import Dashboard from './pages/RecommendationsPage';
import SidebarNavigation from './components/Sidenav';
import UserInfoSurvey from "./pages/UserInfoSurvey";
import MealDisplay from "./components/mealDisplay.component"
import './../css/bootstrap.css';
import './../css/App.css';

function App() {
  const delayRender = (delay) => {
      setTimeout(() => {
          this.setState({ render : !this.state.render })
      }, delay);
    }
    const redirectToHomeContent = (isAuthenticated) => {
      if (isAuthenticated) {
        delayRender(1500);
        window.location.href = '/duke-net-nutrition/content';
      }
    };
    const redirectToSurvey = (isAuthenticated) => {
      if (isAuthenticated) {
        delayRender(1500);
        window.location.href = '/duke-net-nutrition/content/user-info-survey';
      }
    };

  return (
    <Router>
      <Routes>
        <Route
          path="/duke-net-nutrition/sign-in"
          element={<LoginForm redirectToHomeContent={redirectToHomeContent} />}
        />
        <Route
          path="/duke-net-nutrition/sign-up"
          element={<SignUpForm redirectToHomeContent={redirectToSurvey} />}
        />
        <Route path="/duke-net-nutrition/content" element={<WebContent />} />
        <Route path="/duke-net-nutrition/content/dashboard" element={<Dashboard />} />
        <Route path="/duke-net-nutrition/content/user-info-survey" element={<UserInfoSurvey />} />
        <Route path="/duke-net-nutrition/content/next-meal" element={<MealDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
