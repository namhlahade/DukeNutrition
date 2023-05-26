import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebContent from './pages/WebContent';
import LoginForm from './components/login.component';
import SignUpForm from './components/signup.component';
import Dashboard from './pages/RecommendationsPage';
import SidebarNavigation from './components/Sidenav';
import UserInfoSurvey from "./pages/UserInfoSurvey";
import './../css/bootstrap.css';
import './../css/App.css';

function App() {
  const redirectToHomeContent = (isAuthenticated) => {
    if (isAuthenticated) {
      <SidebarNavigation />
      window.location.href = '/content'; // Redirect to the homepage
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/content" element={<WebContent />} />
        <Route exact path="/content/user-info-survey" element={<UserInfoSurvey />} />
        <Route path="/content/dashboard" element={<Dashboard />} />
      </Routes>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/sign-in"
                element={<LoginForm redirectToHomeContent={redirectToHomeContent} />}
              />
              <Route
                path="/"
                element={<SignUpForm redirectToHomeContent={redirectToHomeContent} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
