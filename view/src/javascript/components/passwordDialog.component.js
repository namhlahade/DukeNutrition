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
import { container } from "webpack";


export const PasswordDialog = ({setVisibility, onSubmit, style}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [passwordEntered, setPasswordEntered] = useState('');

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
};

const buttonRow = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '55%'
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
  await onSubmit(passwordEntered);
}

const cancelChanges = () => {
  setVisibility(false);
}

  return (
    <div style={style}>
      <div style={containerStyle}>
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