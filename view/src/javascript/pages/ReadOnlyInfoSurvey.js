import React, { useState, useEffect } from 'react';
import '../../css/userSurvey.css';
import { Alert } from '../components/Alert.component';
import { AuthenticationController } from '../controller/AuthenticationController';
import { useAuth } from '../context/AuthProvider';

export const ReadOnlyUserInfo = () => {
  const [responses, setResponses] = useState({});
  const [flag, setFlag] = useState(0);
  const [alert, setAlert] = useState(null);
  const authenticationController = new AuthenticationController();
  const cookies = useAuth().cookies;
  const [calsAndMacs, setCalsAndMacs] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

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
      console.log(calsAndMacs);
    } catch (error) {
      console.log('Error Creating Meal:', error);
      setAlert({ type: 'danger', message: 'Error in Adding User Info!' });
    }
  };

  return (
    <div id={"userSurveyContainer"}>
      <h1>User Daily Preferences</h1>
      {alert && <Alert message={alert.message} type={alert.type} />}
        <div className="question-container">
          <label className="question-label">
            Calories: 
            <input
              className="question-input"
              type="text"
              defaultValue={calsAndMacs[0]}
              disabled
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Protein (g): 
            <input
              className="question-input"
              type="text"
              defaultValue={calsAndMacs[1]}
              disabled
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Carbs (g): 
            <input
              className="question-input"
              type="text"
              defaultValue={calsAndMacs[2]}
              disabled
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Fat (g): 
            <input
              className="question-input"
              type="text"
              defaultValue={calsAndMacs[3]}
              disabled
            />
          </label>
        </div>
        <div className="question-container">
          <label className="question-label">
            Meals per Day: 
            <input
              className="question-input"
              type="text"
              defaultValue={calsAndMacs[4]}
              disabled
            />
          </label>
        </div>
    </div>
  );
};
