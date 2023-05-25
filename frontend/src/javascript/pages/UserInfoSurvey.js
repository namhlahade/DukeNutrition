import { useCallback } from 'react';

// Default V2 theme
import '../../css/sign-up.css';
// Modern theme
// import 'survey-core/modern.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

// const SURVEY_ID = 1;

const surveyJson = {
  elements: [{
    name: "Calories",
    title: "Enter Calories:",
    type: "text"
  }, {
    name: "Protein",
    title: "Enter Protein:",
    type: "text"
  },
  {
    name: "Carbs",
    title: "Enter Carbs:",
    type: "text"
  },
  {
    name: "Fat",
    title: "Enter Fat:",
    type: "text"
  },
  {
    name: "Meals Per Day",
    title: "Enter Meals Per Day:",
    type: "text"
  },
  {
    type: "radiogroup",
    name: "magnacarta",
    title: "What is Magna Carta?",
    choicesOrder: "random",
    choices: [
        "The foundation of the British parliamentary system",
        "The Great Seal of the monarchs of England",
        "The French Declaration of the Rights of Man",
        "The charter signed by the Pilgrims on the Mayflower"
    ],
    correctAnswer: "The foundation of the British parliamentary system"

}]
};

function UserInfoSurvey() {
  const survey = new Model(surveyJson);
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
    // saveSurveyResults(
    //   "https://your-web-service.com/" + SURVEY_ID,
    //   sender.data
    // )
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
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