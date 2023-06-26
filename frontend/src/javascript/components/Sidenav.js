import styles from "../../css/sidenav.module.css"
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
    <div className={open?styles.sidenav:styles.sidenavClosed}>
        <button className={styles.menuBtn} onClick={toggleOpen}>
            {open? <KeyboardDoubleArrowLeftIcon />: <KeyboardDoubleArrowRightIcon />}
        </button>
        {navData.map(item =>{
            return <NavLink key={item.id} className={styles.sideitem} to={item.link}>
            {item.icon}
            <span className={open ? styles.linkTextVisible : styles.linkTextHidden}>{item.text}</span>
        </NavLink>
        })}
        <div className={styles.logoutButtonContainer}>
            <button className={styles.logoutButton} onClick={logout}>
                <LogoutIcon/> <span className={styles.linkTextVisible}>{open ? 'Logout' : null}</span>
                <br/>
                <br/>
            </button>
        </div>
    </div>
  )
}
