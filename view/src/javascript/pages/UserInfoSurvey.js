import React, { useState, useEffect } from 'react';
import '../../css/userSurvey.css';
import {Alert} from '../components/Alert.component';
import { AuthenticationController } from '../controller/AuthenticationController';
import { useAuth } from '../context/AuthProvider';

const UserInfoSurvey = () => {
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
      responses["userid"] = await authenticationController.getUserId(cookies).then((userId) => {return userId});
      console.log("userid: " + responses["userid"]);
      try {
        const response = await fetch('http://127.0.0.1:5000/authentication/collectUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
        })
        const calsAndMacs = await response.json();
        console.log(calsAndMacs);
        setAlert({ type: 'success', message: 'User Info Added!' });
      }
      catch(error) {
        console.log('Error Creating Meal:', error);
        setAlert({ type: 'danger', message: 'Error in Adding User Info!' });
      }
    }
    


    let responseLength = Object.keys(responses).length
    if (responseLength < 5){
      setAlert({ type: 'danger', message: 'Fill out all the Questions!' });
      return;
    }

    const responseCopy = { ...responses }
    for (var question in responseCopy){
      if (responseCopy[question] == ""){
        setAlert({ type: 'danger', message: 'Fill out all the Questions!' });
        return;
      }
    }

    if (isNaN(responses["calories"])){
      setAlert({ type: 'danger', message: 'Calories must be a number!' });
      return;
    }

    if (isNaN(responses["protein"])){
      setAlert({ type: 'danger', message: 'Protein must be a number!' });
      return;
    }

    if (isNaN(responses["carbs"])){
      setAlert({ type: 'danger', message: 'Carbs must be a number!' });
      return;
    }

    if (isNaN(responses["fat"])){
      setAlert({ type: 'danger', message: 'Fat must be a number!' });
      return;
    }

    if (isNaN(responses["mealsPerDay"])){
      setAlert({ type: 'danger', message: 'Meals per Day must be a number!' });
      return;
    }

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
    <div id={"userSurveyContainer"}>
      <h1>Survey</h1>
      {alert && <Alert message={alert.message} type={alert.type} />}
      <form onSubmit={handleSubmit}>
        <div className="question-container">
          <label className="question-label">
            Enter Calories:
            <input
              className="question-input"
              type="text"
              value={responses["calories"] || ''}
              onChange={(event) => handleChange(event, "calories")}
              onBlur={(event) => handleBlur(event, "calories")}
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Enter Protein:
            <input
              className="question-input"
              type="text"
              value={responses["protein"] || ''}
              onChange={(event) => handleChange(event, "protein")}
              onBlur={(event) => handleBlur(event, "protein")}
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Enter Carbs:
            <input
              className="question-input"
              type="text"
              value={responses["carbs"] || ''}
              onChange={(event) => handleChange(event, "carbs")}
              onBlur={(event) => handleBlur(event, "carbs")}
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Enter Fat:
            <input
              className="question-input"
              type="text"
              value={responses["fat"] || ''}
              onChange={(event) => handleChange(event, "fat")}
              onBlur={(event) => handleBlur(event, "fat")}
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Enter Meals per Day:
            <input
              className="question-input"
              type="text"
              value={responses["mealsPerDay"] || ''}
              onChange={(event) => handleChange(event, "mealsPerDay")}
              onBlur={(event) => handleBlur(event, "mealsPerDay")}
            />
          </label>
        </div>
        {/* Add more questions as needed */}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default UserInfoSurvey;