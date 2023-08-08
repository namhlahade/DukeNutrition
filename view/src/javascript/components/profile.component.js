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
import { Alert } from './Alert.component';
import { AuthenticationController } from '../controller/AuthenticationController';
import { useAuth } from '../context/AuthProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import { PasswordDialog } from './passwordDialog.component';
import styled, { keyframes } from 'styled-components';

const outerContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100vh',
  zIndex: "2",
};

const container = {
  alignContent: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgb(255,255,255)',
  borderRadius: "20px",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
  width : '50%',
};

const editButton = {
  backgroundColor: 'transparent',
  color: 'rgb(10,25,41)',
  border: '2px solid rgb(10,25,41)',
  borderRadius: '10px',
};

const submitButton = {
  backgroundColor: 'transparent',
  color: 'rgb(10,25,41)',
  border: '2px solid rgb(10,25,41)',
  borderRadius: '10px',
};

const deleteButton = {
  backgroundColor: 'transparent',
  color: '#ff4569',
  border: '2px solid #ff4569',
  borderRadius: '10px',
};

const avatarStyle= {
  width: '300px',
  height: '300px',
}

const usernamePasswordRow = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '67%'
}

const buttonRow = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '55%'
}

const textStyle = {
  color: 'rgb(10,25,41)',
  fontSize: '36px',
  fontWeight: 'bold',
};

const stackPane = {
  position: "relative",
  width: "100%",
};

const passwordStyle = {
  zIndex: "2",
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "rgba(0, 0, 0, 0.25)",
};

export  const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const authenticationController = new AuthenticationController();
  const cookies = useAuth().cookies;
  const [responses, setResponses] = useState({});
  const [verifyPasswordData, setVerifyPasswordData] = useState({});
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    getProfile();
  }, []);

  const submitChanges = async () => {
    console.log(responses);
      responses["userid"] = await authenticationController.getUserId(cookies).then((userId) => { return userId; });
      try {
        const response = await fetch(`http:////127.0.0.1:5000/user-info/updateUserInfo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(responses),
        });
        const result = await response.json();
        console.log(result);
        if(result.error == null){
          setIsEditing(false);
          await getProfile();
          setAlert({ type: 'success', message: 'User Info Updated!' });
        } else{
          setAlert({ type: 'danger', message: result.error });
        }
      } catch (error) {
        console.log(error);
        setAlert({ type: 'danger', message: 'Error in Updating User Info!' });
      }
  };

  const getProfile = async () => {
    responses["userid"] = await authenticationController.getUserId(cookies).then((userId) => { return userId; });
    try {
      const response = await fetch(`http://127.0.0.1:5000/profile/getProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
      });
      const result = await response.json();
      setProfile(result);
      console.log(result);
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error in Retrieving Profile!' });
    }
  };

  const editProfile = async () => {
    setPasswordDialog(true);
  };

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
        setPasswordDialog(false);
        setIsEditing(true);
        setVerified(true);
      } else{
        setAlert({ type: 'danger', message: result.error });
      }
      return result;
    } catch (error) {
      setAlert({ type: 'danger', message: error.message });
    }
  };

  const cancelChanges = () => {
    setIsEditing(false);
    setAlert(null);
  };

  const deleteAccount = async () => {
    responses["userid"] = await authenticationController.getUserId(cookies).then((userId) => { return userId; });
    try {
      const response = await fetch(`http://127.0.0.1:5000/profile/deleteProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
      });
      const result = await response.json();
      console.log(result);
      if(result.error == null){
        setAlert({ type: 'success', message: 'Profile Deleted!' });
        window.location.href = '/duke-net-nutrition/sign-in';
      } else{
        setAlert({ type: 'danger', message: result.error });
      }
    } catch (error) {
      console.log(error);
      setAlert({ type: 'danger', message: 'Error in Deleting Profile!' });
    }
  };

  return (
    <div style={stackPane}>
     {passwordDialog && <PasswordDialog style={passwordStyle} setVisibility={setPasswordDialog} onSubmit={verifyPassword}/>}
      <div style={outerContainer}>
        {alert && <Alert type={alert?.type} message={alert?.message} />}
        {isEditing
        ?
        <div  style={container} >
          <h1 style={textStyle}>Edit Profile</h1>
          <br/>
          <Avatar style={avatarStyle}>
            <ProfileIcon style={avatarStyle}/>
          </Avatar>
          <br/>
          <FormControl sx={{ m: 1, width: '67%'}}>
            <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Email"
            />
          </FormControl>
          <div style={usernamePasswordRow}>
            <TextField
              label="Username"
              id="outlined-start-adornment"
            />
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
              />
            </FormControl>
          </div>
          <br/>
          <div style={buttonRow}>
          <Button style={submitButton} type="submit" color="primary" variant="contained" onClick={submitChanges}>
            <EditIcon/>Submit
          </Button>
          <Button style={deleteButton} type='button' color='error' variant="contained" onClick={cancelChanges}>
            <DeleteIcon/>Cancel
          </Button>
          </div>
          <br/>
        </div>
          :
          <div  style={container} >
          <br/>
          <h1 style={textStyle}>Profile</h1>
          <Avatar style={avatarStyle}>
            <ProfileIcon style={avatarStyle}/>
          </Avatar>
          <br/>
          <FormControl variant={"outlined"} sx={{ m: 1, width: '67%'}}>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Email"
              value={profile["email"]}
              disabled
              startAdornment={<InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>}
            />
          </FormControl>
          <div style={usernamePasswordRow}>
          <FormControl variant={"outlined"}>
            <OutlinedInput
              id="outlined-adornment-username"
              label="Username"
              value={profile["username"]}
              type='text'
              disabled
              startAdornment={<InputLabel htmlFor="outlined-adornment-amount">Username</InputLabel>}
            />
            </FormControl>
            <FormControl  variant="outlined">
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={profile["password"]}
                disabled
                startAdornment={<InputLabel htmlFor="outlined-adornment-amount">Password</InputLabel>}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      disabled
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <br/>
          <div style={buttonRow}>
            <Button style={editButton} type="submit" color="primary" variant="contained" onClick={editProfile}>
              <EditIcon/>Edit Profile
            </Button>
            <Button style={deleteButton} type='button' color='error' variant="contained" onClick={deleteAccount}>
              <DeleteIcon/>Delete Account
            </Button>
          </div>
          <br/>
        </div>}
      </div>
    </div>
  );
}