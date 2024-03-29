import React, { Component }  from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MealIcon from '@mui/icons-material/Restaurant';
import SurveyIcon from '@mui/icons-material/Assignment';
import ProfileIcon from '@mui/icons-material/AccountCircle';

export const navData = [
    {
        id: 0,
        icon: <DashboardIcon/>,
        text: "Dashboard",
        link: "/duke-net-nutrition/dashboard"
    },
    {
        id: 1,
        icon: <MealIcon/>,
        text: "Create Meal",
        link: "/duke-net-nutrition/create-meal"
    },
    {
        id: 2,
        icon: <SurveyIcon/>,
        text: "User Preferences",
        link: "/duke-net-nutrition/user-preferences"
    },
    {
        id: 3,
        icon: <ProfileIcon/>,
        text: "Profile",
        link: "/duke-net-nutrition/profile"
    }
]