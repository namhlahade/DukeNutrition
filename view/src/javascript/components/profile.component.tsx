import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Avatar, { avatarClasses } from '@mui/material/Avatar';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CSS from 'csstype';

const container: CSS.Properties = {
  fontFamily: 'Roboto',
  backgroundColor: '#bbd2f1bd',
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center',
}

const editButton: CSS.Properties = {
  fontFamily: 'Roboto',
  backgroundColor: 'transparent',
  color: '#1769aa',
  border: '2px solid #1769aa',
}

const deleteButton: CSS.Properties = {
  fontFamily: 'Roboto',
  backgroundColor: 'transparent',
  color: '#ff4569',
  border: '2px solid #ff4569',
}

const avatarStyle: CSS.Properties = {
  width: '300px',
  height: '300px',
}

export default function InputAdornments() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div  style={container} >
        <Avatar style={avatarStyle}>
          <ProfileIcon style={avatarStyle}/>
        </Avatar>
        <br/>
        <TextField
          label="First Name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
        />
        <TextField
          label="Last Name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
        />
        <br/>
        <TextField
          label="Username"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '51.5ch'}}>
          <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Email"
          />
        </FormControl>
        <br/>
        <Button style={deleteButton} type='button' color='error' variant="contained">
          <DeleteIcon/>Delete Account
        </Button>
        <br/>
        <Button style={editButton} type="submit" color="primary" variant="contained">
          <EditIcon/>Edit Profile
        </Button>
      </div>
    </Box>
  );
}