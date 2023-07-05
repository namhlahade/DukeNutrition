import { Outlet } from 'react-router-dom';
import SideMenuBar from './Sidenav';
import { Grid } from '@mui/material';
import '../../css/PageLayout.css';

const PageLayout = () => (
  <Grid container >
    <SideMenuBar />  
    <div class="contentPane">
      <Outlet /> 
    </div>     
  </Grid>
);

export default PageLayout;