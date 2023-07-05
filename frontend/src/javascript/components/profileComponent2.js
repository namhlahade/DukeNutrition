import React, { Component, useState, useEffect }  from 'react';
import { useCallback } from 'react';

// Default V2 theme
import '../../css/survey.css';
// Modern theme
// import 'survey-core/modern.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

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

const ProfileChange = () => {
    const [profileChangeInput, setProfileChangeInput] = useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        console.log("Input being sent to profile change API");
        console.log(profileChangeInput);
    }, [profileChangeInput]);    

    const handleSubmit = (data) => {
        console.log("data recieved from hitting submit button")
        console.log(data)
        const tempProfile = { ...data }
        console.log("tempData variable information")
        console.log(tempProfile)
        tempProfile["userid"] = "86a75215-6fb8-4d9e-8d89-960a71288ff6";
        setProfileChangeInput(tempProfile);
        console.log("Immediate Change");
        console.log(profileChangeInput)

        fetch('http://127.0.0.1:5000/profile/userInfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileChangeInput),
          })
            .then((response) => response.json())
            .then((result) => {
              // Handle the response from the backend
              if (result.error) {
                setAlert({ type: 'danger', message: result.error });
              } else {
                setAlert({ type: 'success', message: result.message });
                // redirectToHomeContent(true);
              }
            })
            .catch((error) => {
              // Handle any errors that occurred during the request
              console.error('Error:', error);
            });
        
    };

  const Alert = ({ message, type }) => {
    return <div className={`alert alert-${type}`}>{message}</div>;
  };


  const survey = new Model(surveyJson);
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    handleSubmit(sender.data);
  }, []);

  survey.onComplete.add(alertResults);
  survey.onComplete.add(Alert);

  return (
    <div>
        <div>
            <h3>Fill out any amount of fields</h3>
        </div>
        <Survey model={survey} />
        {alert && <Alert message={alert.message} type={alert.type} />}
    </div>
  );
}

export default ProfileChange;