import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WebContent from './pages/WebContent';
import LoginForm from './components/login.component';
import SignUpForm from './components/signup.component';
import SignUpLogin from './pages/signup_login';
import Dashboard from './pages/RecommendationsPage';
import SidebarNavigation from './components/Sidenav';
import MealDisplay from './components/mealDisplay.component';
import UserInfoSurvey from "./pages/UserInfoSurvey";
import Unauthorized from './components/Unauthorized';
import { ProtectRoutes } from './hooks/protectRoutes';
import './../css/bootstrap.css';
import './../css/App.css';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

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
      <Routes>
        <Route path="/" element={<MealDisplay />} />
        <Route
          path="/duke-net-nutrition/sign-in"
          element={<LoginForm />}
        />
        <Route
          path="/duke-net-nutrition/sign-up"
          element={<SignUpForm />}
        />
        <Route path="unauthorized" element={<Unauthorized />} />

         {/* we want to protect these routes */}
        <Route element={<ProtectRoutes />}>
          <Route path="/duke-net-nutrition/content" element={<WebContent />} />
        </Route>
        <Route element={<ProtectRoutes />}>
          <Route path="/duke-net-nutrition/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectRoutes />}>
          <Route path="/duke-net-nutrition/user-info-survey" element={<UserInfoSurvey />} />
        </Route>

        {/* catch all */}
        {/* <Route path="*" element={<Missing />} /> */}
      </Routes>
  );
}

export default App;
