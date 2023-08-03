import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import { UnauthorizedPage } from '../pages/UnauthorizedPage';

export const ProtectRoutes = () => {
    const { cookies } = useAuth();

    return cookies.token ? <Outlet/> : <UnauthorizedPage />;
};