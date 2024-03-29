import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [cookies, setCookies, removeCookie] = useCookies();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const addCookie = (name, value, options) => {
        setCookies(name, value, options);
    };

    const login = async ({ username, password, setAlert}) => {
        fetch('http://127.0.0.1:5000/authentication/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify({ username, password }),
          })
        .then((response) => response.json()) // The first .then() handles the raw HTTP response from the server.
        .then((data) => {
            // Handle the response from the backend
            if (data.error) {
            setAlert({ type: 'danger', message: data.error });
            } else {
            setAlert({ type: 'success', message: data.message });
            // console.log(data.accessToken);
            // console.log(data.role);
            // console.log(data.message);
            setCookies('token', data.accessToken, {maxAge:86400}); // your token, expiration time in seconds (1 day)
            setCookies('name', username, {maxAge:86400}); // optional data 
            //redirectToHomeContent(true);
            navigate('/duke-net-nutrition/dashboard', { replace: true });
            }
        }) // The second .then() handles the parsed JSON data extracted from the response.
        .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
    };

    const logout = () => {
        ['token', 'name'].forEach(obj => removeCookie(obj)); // remove data save in cookies
        navigate('/duke-net-nutrition/sign-in');
    };

    const value = useMemo(
        () => ({
            cookies,
            login,
            logout,
            addCookie
        }),
        [cookies]
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(UserContext)
};