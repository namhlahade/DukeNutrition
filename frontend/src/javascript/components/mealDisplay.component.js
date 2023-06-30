import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import styles from "../../css/mealDisplay.css"
import { RestartAlt } from '@mui/icons-material';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TypeOfMeal = {
  "Pitchforks": "add_item",
  "Bella_Union": "add_item",
  "Ginger_and_Soy": "build_your_own"
}


const MealDisplay = () => {
  const [restaurantData, setRestaurantData] = useState(null); // This is the all the restaurant dat (all restaurants, types of meals, and food)
  const [meal, setMeal] = useState({}); // This is the meal that is being built and added to the database
  const [mealCounterData, setMealCounterData] = useState({});

  useEffect(() => {
    console.log("mealCounterData: ")
    console.log(mealCounterData);
  },[mealCounterData]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/nextMeal/allRestaurants');
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
      }
    };

    fetchData();
  }, []);

  const addMeal = (restaurant, type, thing) => {
    const tempMealCounterData = { ...mealCounterData };
    const tempMeal = meal;

    if (Object.keys(tempMeal).length === 1){
      if (!Object.keys(tempMeal).includes(restaurant)){
        alert("You can only add one restaurant at a time!"); // Want to create a warning pop up
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
      alert("Your Meal is Empty!"); // Want to create a warning pop up
      return;
    }
    var restaurant = Object.keys(meal)[0];
    const mealOptions = Object.keys(meal[restaurant])
    const allMealOptions = Object.keys(restaurantData[restaurant])
    var mealOptionsSet = new Set()

    for (var key in mealOptions){
      mealOptionsSet.add(key)
    }
    if (mealOptions.length != allMealOptions.length){
      const tempMeal = {... meal };
      for (var typeOption in allMealOptions){
        if (!mealOptionsSet.has(typeOption)){
          tempMeal[restaurant][allMealOptions[typeOption]] = [];
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

    const fetchCalsAndMacs = async () => {

      try {
        const response = await fetch('http://127.0.0.1:5000/nextMeal/selectMeal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealSend),
        })
        const calsAndMacs = await response.json();
        console.log(calsAndMacs)
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


      }
      catch(error) {
        console.log('Error fetching restaurant data:', error);
      }
    }
    fetchCalsAndMacs();

  };

  if (restaurantData === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1 className='mainHeading'>Duke Meals</h1>
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
                                      <button class="plus-button plus-button--small" onClick = {() => addMeal(restaurant, type, thing)}/>
                                      <span className>{mealCounterData[restaurant][type][thing]}</span>
                                      <button class="minus-button minus-button--small" onClick = {() => deleteMeal(restaurant, type, thing)}/>
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
    </>
  );
};

export default MealDisplay;