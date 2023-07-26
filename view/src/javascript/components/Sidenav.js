import "../../css/PageLayout.css"
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import { navData } from "../lib/navData";
import React, { Component }  from 'react';
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function Sidenav() {
    const [open, setopen] = useState(true)
    const toggleOpen = () => {

        /*CSS variables are meant to be set during the parsing of CSS and provide a way to define reusable values that can be used throughout your stylesheets. Once a CSS variable is set, it will maintain its value for the entire duration of the page load.

        If you want to change the value of a CSS variable dynamically, you need to use JavaScript, as shown in the previous example. JavaScript allows you to interact with the DOM and update CSS variables at runtime, providing a way to achieve dynamic theming or adjust styles based on user interactions or other conditions.*/

        const root = document.documentElement;
        if(open){
            root.style.setProperty('--sidenav-column-width', '60px');
        } else {
            root.style.setProperty('--sidenav-column-width', '200px');
        }
        setopen(!open)
    }
    const { logout } = useAuth();
  return (
    <div className={open ? 'sidenav' : 'sidenavClosed'}>
        <button className={'menuBtn'} onClick={toggleOpen}>
            {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
        </button>
        {navData.map(item =>{
            return <NavLink key={item.id} id={'sideitem'} to={item.link}>
            {item.icon}
            <span className={open ? 'linkTextVisible' : 'linkTextHidden'}>{item.text}</span>
        </NavLink>
        })}
        <div className={'logoutButtonContainer'}>
            <button className={'logoutButton'} onClick={logout}>
                <LogoutIcon/> <span className={'linkTextVisible'}>{open ? 'Logout' : null}</span>
                <br/>
                <br/>
            </button>
        </div>
    </div>
  )
}