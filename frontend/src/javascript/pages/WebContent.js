
import Dashboard from './RecommendationsPage';
import SidebarNavigation from '../components/Sidenav';
import UserInfoSurvey from "./UserInfoSurvey";
import React from 'react'
import '../../css/bootstrap.css'
import '../../css/App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function WebContent() {
  return (
      <div className="content">
        <SidebarNavigation />
        <Routes>
          <Route exact path="/content/user-info-survey" element={<UserInfoSurvey />} />
          <Route path="/content/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
  )
}

export default WebContent