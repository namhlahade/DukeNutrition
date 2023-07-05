import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import SidebarNavigation from '../components/Sidenav';
import UserInfoSurvey from "./UserInfoSurvey";

function WebContent() {
  return (
    <div>
        <SidebarNavigation/>
        <Routes>
            <Route path="/content/user-info-survey" element={<UserInfoSurvey />} />
            <Route path="/content/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  );
}

export default WebContent;
