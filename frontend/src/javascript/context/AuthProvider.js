import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [cookies, setCookies, removeCookie] = useCookies();
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const login = async ({ username, password, alert}) => {
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
            const accessToken = data.accessToken;
            setCookies('token', accessToken);
            const roles = data.role; //user code
            // console.log(data.accessToken);
            // console.log(data.role);
            // console.log(data.message);
            setCookies('token', data.accessToken); // your token
            setCookies('name', username); // optional data
            //redirectToHomeContent(true);
            navigate(from, { replace: true });
            }
        }) // The second .then() handles the parsed JSON data extracted from the response.
        .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
    };

    const logout = () => {
        ['token', 'name'].forEach(obj => removeCookie(obj)); // remove data save in cookies
        navigate('/login');
    };

    const value = useMemo(
        () => ({
            cookies,
            login,
            logout
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