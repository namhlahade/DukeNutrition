import React, { Component }  from 'react';
import DashboardIcon from '../../../node_modules/@mui/icons-material/Dashboard';
import MealIcon from '../../../node_modules/@mui/icons-material/Restaurant';
import SurveyIcon from '../../../node_modules/@mui/icons-material/Assignment';
import ProfileIcon from '../../../node_modules/@mui/icons-material/AccountCircle';

export const navData = [
    {
        id: 0,
        icon: <DashboardIcon/>,
        text: "Dashboard",
        link: "/duke-net-nutrition/content/dashboard"
    },
    {
        id: 1,
        icon: <MealIcon/>,
        text: "Next Meal",
        link: "/duke-net-nutrition/content/next-meal"
    },
    {
        id: 2,
        icon: <SurveyIcon/>,
        text: "User Info Survey",
        link: "/duke-net-nutrition/content/user-info-survey"
    },
    {
        id: 3,
        icon: <ProfileIcon/>,
        text: "Profile",
        link: "/duke-net-nutrition/content/profile"
    }
]