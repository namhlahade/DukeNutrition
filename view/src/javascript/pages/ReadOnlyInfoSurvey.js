import React, { useState, useEffect } from 'react';
import '../../css/userSurvey.css';
import { Alert } from '../components/Alert.component';
import { AuthenticationController } from '../controller/AuthenticationController';
import { useAuth } from '../context/AuthProvider';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SubmitIcon from '@mui/icons-material/CheckCircle';
import Avatar, { avatarClasses } from '@mui/material/Avatar';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import { InputLabel } from '@mui/material';
import { OutlinedInput } from '@mui/material';  
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import {FormControl} from '@mui/material';
import {Visibility} from '@mui/icons-material';
import {VisibilityOff} from '@mui/icons-material';

const outerContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100vh',
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

const cancelButton = {
  backgroundColor: 'transparent',
  color: '#ff4569',
  border: '2px solid #ff4569',
  borderRadius: '10px',
};

const outlinedInput = {
  width: '100%',
  color: 'rgb(10,25,41)',
  marginBottom: "20px",
};

const textStyle = {
  color: 'rgb(10,25,41)',
  fontSize: '36px',
  fontWeight: 'bold',
};

export const ReadOnlyUserInfo = () => {
  const [responses, setResponses] = useState({});
  const [flag, setFlag] = useState(0);
  const [alert, setAlert] = useState(null);
  const authenticationController = new AuthenticationController();
  const cookies = useAuth().cookies;
  const [calsAndMacs, setCalsAndMacs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUserData();
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
          await getUserData();
          setAlert({ type: 'success', message: 'User Info Updated!' });
        } else{
          setAlert({ type: 'danger', message: result.error });
        }
      } catch (error) {
        console.log(error);
        setAlert({ type: 'danger', message: 'Error in Updating User Info!' });
      }
  };

  const getUserData = async () => {
    responses["userid"] = await authenticationController.getUserId(cookies).then((userId) => { return userId; });
    try {
      const response = await fetch(`http://127.0.0.1:5000/user-info/getUserInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
      });
      const result = await response.json();
      setCalsAndMacs(result.userPref);
      console.log(result.userPref);
      console.log(calsAndMacs);
    } catch (error) {
      console.log('Error Creating Meal:', error);
      setAlert({ type: 'danger', message: 'Error in Adding User Info!' });
    }
  };

  const editPreferences = () => {
    setIsEditing(true);
  };

  const cancelChanges = () => {
    setIsEditing(false);
    setAlert(null);
  };

  return (
    <div style={outerContainer}>
      {alert && <Alert type={alert?.type} message={alert?.message} />}
      <div  style={container} >
        <br/>
        <h1 style={textStyle}>Daily Preferences</h1>  
        {isEditing ?        
        <>
        <FormControl sx={{ m: 1, width: '25ch'}}>
          <InputLabel htmlFor="outlined-adornment-amount">Calories</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Calories"
            defaultValue={calsAndMacs[0]}
            style={outlinedInput}
            onChange={(e) => setResponses({ ...responses, calories: e.target.value })}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Protein (g)</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Protein (g)"
            defaultValue={calsAndMacs[1]}
            style={outlinedInput}
            onChange={(e) => setResponses({ ...responses, protein: e.target.value })}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Carbs (g)</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Carbs (g)"
            defaultValue={calsAndMacs[2]}
            style={outlinedInput}
            onChange={(e) => setResponses({ ...responses, carbs: e.target.value })}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Fat (g)</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Fat (g)"
            defaultValue={calsAndMacs[3]}
            style={outlinedInput}
            onChange={(e) => setResponses({ ...responses, fat: e.target.value })}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Meals per Day</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Meals per Day"
            defaultValue={calsAndMacs[4]}
            style={outlinedInput}
            onChange={(e) => setResponses({ ...responses, num_meals: e.target.value })}
          />
        </FormControl>
        </>
        :
        <>
         <FormControl sx={{ m: 1, width: '25ch'}}>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Calories"
            value={calsAndMacs[0]}
            style={outlinedInput}
            disabled
            startAdornment={<InputLabel htmlFor="outlined-adornment-amount">Calories</InputLabel>}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Protein (g)"
            value={calsAndMacs[1]}
            style={outlinedInput}
            disabled
            startAdornment={<InputLabel htmlFor="outlined-adornment-amount">Protein (g)</InputLabel>}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Carbs (g)"
            value={calsAndMacs[2]}
            style={outlinedInput}
            disabled
            startAdornment={<InputLabel htmlFor="outlined-adornment-amount">Carbs (g)</InputLabel>}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Fat (g)"
            value={calsAndMacs[3]}
            style={outlinedInput}
            disabled
            startAdornment={<InputLabel htmlFor="outlined-adornment-amount">Fat (g)</InputLabel>}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Meals per Day"
            value={calsAndMacs[4]}
            style={outlinedInput}
            disabled
            startAdornment={<InputLabel htmlFor="outlined-adornment-amount">Meals per Day</InputLabel>}
          />
        </FormControl>
        </>}
        {isEditing 
            ? 
          <>
          <Button style={submitButton} type="button" color="primary" variant="contained" onClick={submitChanges}>
            <SubmitIcon/>Submit
          </Button>
          <br/>
          <Button style={cancelButton} type="button" color="primary" variant="contained" onClick={cancelChanges}>
            <CancelIcon/>Cancel
          </Button>
          </>
          :
          <Button style={editButton} type="button" color="primary" variant="contained" onClick={editPreferences}>
            <EditIcon/>Edit Preferences
          </Button>
        }
        <br/>
      </div>
    </div>
  );
};
