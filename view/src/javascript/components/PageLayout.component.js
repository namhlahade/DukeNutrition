import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideMenuBar from './Sidenav';
import { Grid } from '@mui/material';
import '../../css/PageLayout.css';
import { AuthenticationController } from '../controller/AuthenticationController';
import { useAuth } from '../context/AuthProvider';

const PageLayout = () => {
  const authenticationController = new AuthenticationController();
  const cookies = useAuth().cookies;
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserId = async () => {
      const userId = await authenticationController.getUserId(cookies);
      if (userId == null) {
        navigate('/duke-net-nutrition/unauthorized');
      }
    };
    checkUserId();
  }, [cookies, navigate]);

  return (
    <Grid id='grid-container' container >
      <SideMenuBar />  
      <div className="contentPane">
        <Outlet /> 
      </div>     
    </Grid>
  );
};

export default PageLayout;
