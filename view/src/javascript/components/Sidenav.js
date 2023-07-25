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
        setopen(!open)
    }
    const { logout } = useAuth();
  return (
    <div class={open ? 'sidenav' : 'sidenavClosed'}>
        <button class={'menuBtn'} onClick={toggleOpen}>
            {open? <KeyboardDoubleArrowLeftIcon />: <KeyboardDoubleArrowRightIcon />}
        </button>
        {navData.map(item =>{
            return <NavLink key={item.id} id={'sideitem'} to={item.link}>
            {item.icon}
            <span class={open ? 'linkTextVisible' : 'linkTextHidden'}>{item.text}</span>
        </NavLink>
        })}
        <div class={'logoutButtonContainer'}>
            <button class={'logoutButton'} onClick={logout}>
                <LogoutIcon/> <span class={'linkTextVisible'}>{open ? 'Logout' : null}</span>
                <br/>
                <br/>
            </button>
        </div>
    </div>
  )
}
