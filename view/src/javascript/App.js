import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/login.component';
import SignUpForm from './components/signup.component';
import ProfileChange from './components/profileComponent2';
import {Dashboard} from './pages/Dashboard';
import MealDisplay from './components/mealDisplay.component';
import UserInfoSurvey from "./pages/UserInfoSurvey";
import {UnauthorizedPage} from './pages/UnauthorizedPage';
import { ProtectRoutes } from './hooks/protectRoutes';
import PageLayout from './components/PageLayout.component';
import 'bootstrap/dist/css/bootstrap.min.css';


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
        <Route
            path="/duke-net-nutrition/sign-in"
            element={<LoginForm />}
          />
          <Route
            path="/duke-net-nutrition/sign-up"
            element={<SignUpForm />}
          />
        <Route 
          path="*" 
          element={<UnauthorizedPage />} 
        />
         {/* we want to protect these routes */}
        <Route element={<ProtectRoutes />}>
            <Route path="/duke-net-nutrition/user-preferences" element={<UserInfoSurvey />} />
            <Route element={<PageLayout />} >
              <Route path="/duke-net-nutrition/dashboard" element={<Dashboard />} />
              <Route path="/duke-net-nutrition/profile" element={<ProfileChange />} />
              <Route path="/duke-net-nutrition/create-meal" element={<MealDisplay />} />
            </Route>
        </Route>
        {/* catch all */}
        {/* <Route path="*" element={<Missing />} /> */}
      </Routes>
  );
}

export default App;
