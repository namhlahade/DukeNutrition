import { Outlet } from 'react-router-dom';
import SideMenuBar from './Sidenav';
import { Grid } from '@mui/material';
import '../../css/PageLayout.css';

const PageLayout = () => (
  <Grid id='grid-container' container >
    <SideMenuBar />  
    <div className="contentPane">
      <Outlet /> 
    </div>     
  </Grid>
);

export default PageLayout;