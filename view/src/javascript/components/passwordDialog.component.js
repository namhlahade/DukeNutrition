import React from "react";
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState } from 'react';
import { AuthenticationController } from '../controller/AuthenticationController';
import { useAuth } from "../context/AuthProvider";
import { Alert } from './Alert.component';


export const PasswordDialog = ({setVisibility, onSubmit, style}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [passwordEntered, setPasswordEntered] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });
  const cookies = useAuth().cookies;
  const authenticationController = new AuthenticationController();

  const submitButton = {
    backgroundColor: 'transparent',
    color: 'rgb(10,25,41)',
    border: '2px solid rgb(10,25,41)',
    borderRadius: '10px',
  };

const textStyle = {
  color: 'rgb(10,25,41)',
  fontSize: '16px',
  fontWeight: 'bold',
};

const deleteButton = {
  backgroundColor: 'transparent',
  color: '#ff4569',
  border: '2px solid #ff4569',
  borderRadius: '10px',
  marginLeft: '10px',
};

const buttonRow = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}

const containerStyle = {
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
};

const submitChanges = async () => {
  await verifyPassword(passwordEntered);
}

const cancelChanges = () => {
  setVisibility(false);
}


const verifyPassword = async (passwordAttempt) => {
  const userid = await authenticationController.getUserId(cookies).then((userId) => { return userId; });
  console.log(passwordAttempt);
  try {
    const response = await fetch(`http://127.0.0.1:5000/profile/verifyPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password: passwordAttempt, userid: userid}),
    });
    const result = await response.json();
    console.log(result);
    if(result.error == null){
      setAlert({ type: 'success', message: 'Password Verified!' });
      setVisibility(false);
      await onSubmit();
    } else{
      setAlert({ type: 'danger', message: result.error });
    }
    return result;
  } catch (error) {
    setAlert({ type: 'danger', message: error.message });
  }
};



  return (
    <div style={style}>
      <div style={containerStyle}>
      {alert && <Alert type={alert.type} message={alert.message} />}
        <h1 style={textStyle}>Verify Password</h1>
        <FormControl  variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={(e) => setPasswordEntered(e.target.value)}
              />
        </FormControl>
        <br/>
        <div style={buttonRow}>
          <Button style={submitButton} type="submit" color="primary" variant="contained" onClick={submitChanges}>
            <EditIcon/>Submit
          </Button>
          <Button style={deleteButton} type='button' color='error' variant="contained" onClick={cancelChanges}>
            <DeleteIcon/>Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}