import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import "../../css/mealDisplay.css";
import { RestartAlt } from '@mui/icons-material';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingSpinner from '../components/LoadingSpinner.js';
import { SurveyError } from 'survey-core';
import Alert from './Alert';
import {useDash} from '../context/DashProvider.js';

const TypeOfMeal = {
  "Pitchforks": "add_item",
  "Bella_Union": "add_item",
  "Ginger_and_Soy": "build_your_own"
}


const MealDisplay = () => {
  const [restaurantData, setRestaurantData] = useState(null); // This is the all the restaurant data (all restaurants, types of meals, and food)
  const [meal, setMeal] = useState({}); // This is the meal that is being built and added to the database
  const [mealCounterData, setMealCounterData] = useState({});
  const [alert, setAlert] = useState(null);
  const [mealCalsMacs, setMealCalsMacs] = useState({});
  const handleAddMeal = useDash().handleAddMeal;

  useEffect(() => {
    console.log("mealCounterData: ")
    console.log(mealCounterData);
  },[mealCounterData]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
        };
        const response = await fetch('http://127.0.0.1:5000/nextMeal/allRestaurants', options);
        const data = await response.json();
        setRestaurantData(data);
        console.log("Data from allRestaurants API call");
        console.log(data);

        const tempCounterObject = {}
        for (const restaurant in data){
          if (!tempCounterObject.hasOwnProperty(restaurant)){
            tempCounterObject[restaurant] = {};
          }
          for (const mealType in data[restaurant]){
            if (!tempCounterObject[restaurant].hasOwnProperty(mealType)){
              tempCounterObject[restaurant][mealType] = {};
            }
            for (const food in data[restaurant][mealType]){
              tempCounterObject[restaurant][mealType][data[restaurant][mealType][food]] = 0;
            }
          }
        }
        setMealCounterData(tempCounterObject)

      }
      
      catch (error) {
        console.error('Error fetching restaurant data:', error);
        setAlert({ type: 'danger', message: 'Error fetching restaurant data!' });
      }
    };

    fetchData();
  }, []);

  const clearMeal = () => {
    setMeal({});
    console.log("clearMeal Meal Variable:");
    console.log(meal);

    const tempMeal = { ...mealCounterData }
      for (var restaurant in tempMeal){
        for (var type in tempMeal[restaurant]){
          for (const food in tempMeal[restaurant][type]){
            tempMeal[restaurant][type][food] = 0;
          }
        }
      }

      setMealCounterData(tempMeal);
      console.log("clearMeal MealCounter Variable:")
      console.log(tempMeal);
      
  };

  const addMeal = (restaurant, type, thing) => {
    const tempMealCounterData = { ...mealCounterData };
    const tempMeal = meal;

    if (Object.keys(tempMeal).length === 1){
      if (!Object.keys(tempMeal).includes(restaurant)){
        setAlert({ type: 'danger', message: 'You can only add one restaurant at a time!' });
        return;
      }
    }

    tempMealCounterData[restaurant][type][thing] += 1;
    setMealCounterData(tempMealCounterData);
    console.log("Updated mealCounterData:");
    console.log(mealCounterData);

    if (!tempMeal.hasOwnProperty(restaurant)) {
      tempMeal[restaurant] = {};
    }
    if (!tempMeal[restaurant].hasOwnProperty(type)){
      tempMeal[restaurant][type] = [];
    }
    console.log("Check")
    console.log(tempMeal[restaurant])
    tempMeal[restaurant][type].push(thing);
    setMeal(tempMeal);
    console.log("Updated meal:");
    console.log(meal)

  };

  const deleteMeal = (restaurant, type, thing) => {
    const tempMealCounterData = { ...mealCounterData };

    var canDelete = false;
    if (tempMealCounterData[restaurant][type][thing] > 0){
      tempMealCounterData[restaurant][type][thing] -= 1;
      canDelete = true;
    }
    setMealCounterData(tempMealCounterData);
    console.log("Updated mealCounterData:");
    console.log(mealCounterData);
    const tempMeal = meal
    if (canDelete == true){
      var i = tempMeal[restaurant][type].indexOf(thing);
      if (i >= 0){
        tempMeal[restaurant][type].splice(i, 1);
      }
      if (tempMeal[restaurant][type].length == 0){
        delete tempMeal[restaurant][type];
      }
      if (Object.keys(tempMeal[restaurant]).length == 0){
        delete tempMeal[restaurant];
      }
    }

    setMeal(tempMeal)
    console.log("Updated meal:");
    console.log(meal);

  };

  const sendData = () => {
    console.log("Add Meal Button pressed.")
    if (Object.keys(meal).length === 0){
      setAlert({ type: 'danger', message: 'Your Meal is Empty!' });
      return;
    }
    var restaurantChosen = Object.keys(meal)[0];
    const mealOptions = Object.keys(meal[restaurantChosen])
    const allMealOptions = Object.keys(restaurantData[restaurantChosen])
    var mealOptionsSet = new Set()

    for (var key in mealOptions){
      mealOptionsSet.add(key)
    }
    if (mealOptions.length != allMealOptions.length){
      const tempMeal = {... meal };
      for (var typeOption in allMealOptions){
        if (!mealOptionsSet.has(typeOption)){
          tempMeal[restaurantChosen][allMealOptions[typeOption]] = [];
        }
      }
      setMeal(tempMeal);
    }
    console.log("updated meal variable after pressing Add Meal Button")
    console.log(meal)
    
    const mealSend = {}
    for (const [restaurant, restaurantData] of Object.entries(meal)){
      mealSend["restaurant"] = restaurant;
      mealSend["meal_type"] = TypeOfMeal[restaurant];
      for (const [type, things] of Object.entries(restaurantData)){
        mealSend[type] = things;
      }
    }

    mealSend["userid"] = "86a75215-6fb8-4d9e-8d89-960a71288ff6";

    console.log("Meal being sent to API:");
    console.log(mealSend);
    setAlert({ type: 'success', message: 'Meal Added!' });
    let calsAndMacs = {};
    const fetchCalsAndMacs = async () => {

      try {
        const response = await fetch('http://127.0.0.1:5000/nextMeal/selectMeal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealSend),
        })
        calsAndMacs = await response.json();
        console.log(calsAndMacs);
        setMeal({});
        const tempMeal = { ...mealCounterData }
        for (var restaurant in tempMeal){
          for (var type in tempMeal[restaurant]){
            for (const food in tempMeal[restaurant][type]){
              tempMeal[restaurant][type][food] = 0;
            }
          }
        }

        console.log(tempMeal);
        setMealCounterData(tempMeal)
        // placed inside async function to ensure that calsAndMacs is updated before handleAddMeal is called
        handleAddMeal({meal:meal[restaurantChosen], restaurant: restaurantChosen, calsAndMacs: calsAndMacs}); 
        console.log('sent meal to dashboard history');
        console.log("mealCalsMacs: " + calsAndMacs);
      }
      catch(error) {
        console.log('Error Creating Meal:', error);
        setAlert({ type: 'danger', message: 'Error Creating Meal!' });
      }
    }
    fetchCalsAndMacs();

  };

  if (restaurantData === null) {
    return <div><LoadingSpinner/></div>;
  }

  return (
    <div id='mealDisplayContainer'>
      <div>
        <h1 className='mainHeading'>Duke Meals</h1>
        {alert && <Alert message={alert.message} type={alert.type} />}
      </div>
      <div>
      <div className="custom-accordion">
        <Accordion>
          {Object.entries(restaurantData).map(([restaurant, nestedData]) => (
            <Accordion.Item key={restaurant} eventKey={restaurant}>
              <Accordion.Header><h5>{restaurant.replaceAll("_", " ")}</h5></Accordion.Header>
              <Accordion.Body>
                <Accordion>
                  {Object.entries(nestedData).map(([type, things]) => (
                    <Accordion.Item key={type} eventKey={type}>
                      <Accordion.Header><h5>{type}</h5></Accordion.Header>
                      <Accordion.Body>
                        <div className="checkbox-list">
                          {things.map((thing) => (
                            <div>
                              <Container>
                              <Row>
                                <div className='box'>
                                  <Col>
                                    <h6>
                                      {thing}
                                    </h6>
                                  </Col>
                                  <Col>
                                    <div className="plusMinus">
                                      <button className="plus-button plus-button--small" onClick = {() => addMeal(restaurant, type, thing)}/>
                                      <span>{mealCounterData[restaurant][type][thing]}</span>
                                      <button className="minus-button minus-button--small" onClick = {() => deleteMeal(restaurant, type, thing)}/>
                                    </div>
                                  </Col>    
                                </div>
                              </Row>
                              </Container>
                            </div>
                          ))}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      </div>
      <div className='submitButton'>
        <Button variant="outline-primary" onClick = {() => sendData()}>Add Meal</Button>
      </div>
      <div className='submitButton'>
        <Button variant="outline-primary" onClick = {() => clearMeal()}>Clear</Button>
      </div>
    </div>
  );
};

export default MealDisplay;