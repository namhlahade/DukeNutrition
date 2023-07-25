import React, { useState, useEffect } from 'react';
import '../../css/userSurvey.css';
import {Alert} from './Alert.component';
import { AuthenticationController } from '../controller/AuthenticationController';
import { useAuth } from '../context/AuthProvider';

const ProfileChange = () => {
  const [responses, setResponses] = useState({});
  const [flag, setFlag] = useState(0);
  const [alert, setAlert] = useState(null);
  const authenticationController = new AuthenticationController();
  const cookies = useAuth().cookies;


  useEffect(() => {
    console.log("Updated Responses Variable")
    console.log(responses);
  }, [flag]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Input being sent to API for userInfoSurvey:")
    console.log(responses);

    const sendUserData = async () => {
      const userid = await authenticationController.getUserId(cookies).then((userId) => {return userId});
      responses["userid"] = userid;
      try {
        const response = await fetch('http://127.0.0.1:5000/profile/userInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
        })
        const calsAndMacs = await response.json();
        console.log(calsAndMacs);
        setAlert({ type: 'success', message: 'User Info Updating!' });
      }
      catch(error) {
        console.log('Error Creating Meal:', error);
        setAlert({ type: 'danger', message: 'Error in Updating User Info!' });
      }
    }
    


    let responseLength = Object.keys(responses).length
    if (responseLength === 0){
      setAlert({ type: 'danger', message: 'Fill out at least 1 field!' });
      return;
    }

    const responseCopy = { ...responses }
    for (var question in responseCopy){
      if (responseCopy[question] == ""){
        delete responseCopy[question];
      }
    }

    setResponses(responseCopy);
    setFlag(flag + 1);

    sendUserData();

  };

  const handleChange = (event, questionIndex) => {
    const { value } = event.target;
    setResponses((prevResponses) => {
      const updatedResponses = {...prevResponses};
      updatedResponses[questionIndex] = value;
      return updatedResponses;
    });
  };

  const handleBlur = (event, questionIndex) => {
    const { value } = event.target;
    setResponses((prevResponses) => {
      const updatedResponses = {...prevResponses};
      updatedResponses[questionIndex] = value;
      return updatedResponses;
    });
    setFlag(flag + 1)
  };

  return (
    <div id={"profileContainer"}>
      <h1>Profile Change</h1>
      {alert && <Alert message={alert.message} type={alert.type} />}
      <form onSubmit={handleSubmit}>
        <div className="question-container">
          <label className="question-label">
            Enter New Username:
            <input
              className="question-input"
              type="text"
              value={responses["newUsername"] || ''}
              onChange={(event) => handleChange(event, "newUsername")}
              onBlur={(event) => handleBlur(event, "newUsername")}
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Enter New Password:
            <input
              className="question-input"
              type="text"
              value={responses["newPassword"] || ''}
              onChange={(event) => handleChange(event, "newPassword")}
              onBlur={(event) => handleBlur(event, "newPassword")}
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
          Enter New Calories:
            <input
              className="question-input"
              type="text"
              value={responses["newCalories"] || ''}
              onChange={(event) => handleChange(event, "newCalories")}
              onBlur={(event) => handleBlur(event, "newCalories")}
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Enter New Protein:
            <input
              className="question-input"
              type="text"
              value={responses["newProtein"] || ''}
              onChange={(event) => handleChange(event, "newProtein")}
              onBlur={(event) => handleBlur(event, "newProtein")}
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Enter New Carbs:
            <input
              className="question-input"
              type="text"
              value={responses["newCarbs"] || ''}
              onChange={(event) => handleChange(event, "newCarbs")}
              onBlur={(event) => handleBlur(event, "newCarbs")}
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Enter New Fat:
            <input
              className="question-input"
              type="text"
              value={responses["newFat"] || ''}
              onChange={(event) => handleChange(event, "newFat")}
              onBlur={(event) => handleBlur(event, "newFat")}
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Enter New Number of Meals per Day:
            <input
              className="question-input"
              type="text"
              value={responses["newNum_meals"] || ''}
              onChange={(event) => handleChange(event, "newNum_meals")}
              onBlur={(event) => handleBlur(event, "newNum_meals")}
            />
          </label>
        </div>
        {/* Add more questions as needed */}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default ProfileChange;

const surveyJson = {
  elements: [{
    name: "newUsername",
    title: "Enter New Username:",
    type: "text"
  },
  {
    name: "newPassword",
    title: "Enter New Password:",
    type: "text"
  }, 
  {
    name: "newCalories",
    title: "Enter New Calories:",
    type: "text"
  }, 
  {
    name: "newProtein",
    title: "Enter New Protein:",
    type: "text"
  },
  {
    name: "newCarbs",
    title: "Enter New Carbs:",
    type: "text"
  },
  {
    name: "newFat",
    title: "Enter Fat:",
    type: "text"
  },
  {
    name: "newNum_meals",
    title: "Enter New Number of Meals Per Day:",
    type: "text"
  }]
};