import React, { Component }  from 'react';
import { useCallback } from 'react';

// Default V2 theme
import '../../css/survey.css';
// Modern theme
// import 'survey-core/modern.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

const Alert = ({ message, type }) => {
    return <div className={`alert alert-${type}`}>{message}</div>;
  };

const handleSubmit = (data) => {
    // Send an HTTP POST request to the backend API endpoint
    console.log("This is the data:")
    console.log(data)
    fetch('http://127.0.0.1:5000/authentication/collectUserInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the response from the backend
        if (result.error) {
          alert({ type: 'danger', message: result.error });
        } else {
          alert({ type: 'success', message: result.message });
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  };

const surveyJson = {
  elements: [{
    name: "userid",
    title: "Username:",
    type: "text"
  },
  {
    name: "calories",
    title: "Enter Calories:",
    type: "text"
  }, 
  {
    name: "protein",
    title: "Enter Protein:",
    type: "text"
  },
  {
    name: "carbs",
    title: "Enter Carbs:",
    type: "text"
  },
  {
    name: "fat",
    title: "Enter Fat:",
    type: "text"
  },
  {
    name: "mealsPerDay",
    title: "Enter Meals Per Day:",
    type: "text"
  }]
};

function UserInfoSurvey() {
  const survey = new Model(surveyJson);
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    handleSubmit(sender.data);
  }, []);

  survey.onComplete.add(alertResults);
  survey.onComplete.add(Alert)

  return (
    <div>
        <Survey model={survey} />
        {alert && <Alert message={alert.message} type={alert.type} />}
    </div>
  );
}

// function saveSurveyResults(url, json) {
//   const request = new XMLHttpRequest();
//   request.open('POST', url);
//   request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//   request.addEventListener('load', () => {
//     // Handle "load"
//   });
//   request.addEventListener('error', () => {
//     // Handle "error"
//   });
//   request.send(JSON.stringify(json));
// }

export default UserInfoSurvey;