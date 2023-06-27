import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import styles from "../../css/mealDisplay.css"

const TypeOfMeal = {
  "Pitchforks": "add_item",
  "Bella_Union": "add_item",
  "Ginger_and_Soy": "build_your_own"
}

const MealDisplay = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [meal, setMeal] = useState({});
  const [mealData, setMealData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/nextMeal/allRestaurants');
        const data = await response.json();
        setRestaurantData(data);
        console.log("Data from allRestaurants API call");
        console.log(data);
      } 
      
      catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("meal Variable: ")
    console.log(meal);
  },[meal]);

  useEffect(() => {
    console.log("mealData variable")
    console.log(mealData);
  },[mealData]);

  const dataGather = (event, restaurant, type, thing) => {
    const checkbox = event.target;

    if (checkbox.checked) {
      console.log("Checkbox is checked")
      console.log(restaurant, type, thing)

      setMeal((prevMeals) => {
        // If restaurant already in prevMeals
        if (prevMeals.hasOwnProperty(restaurant)) {
          const restaurantData = prevMeals[restaurant]

          if (restaurantData.hasOwnProperty(type)) {
            const updateRestaurantData = {
              ...restaurantData,
              [type]: [...restaurantData[type], thing]
            };
            return {
              ...prevMeals,
              [restaurant]: updateRestaurantData
            };

          }
          else {
            const updateRestaurantData = {
              ...restaurantData,
              [type]: [thing]
            }
            return {
              ...prevMeals,
              [restaurant]: updateRestaurantData
            };
          }
        }

        else {
          return {
            ...prevMeals,
            [restaurant]: {
              [type]: [thing]
            }
          }
        }

      })

    } 
    else {
      setMeal((prevMeals) => {
        if (prevMeals.hasOwnProperty(restaurant)) {
          const restaurantData = prevMeals[restaurant];
  
          if (restaurantData.hasOwnProperty(type)) {
            const updatedTypeData = restaurantData[type].filter(
              (item) => item !== thing
            );
  
            // If the updated type data is empty, remove the type from the restaurant data
            if (updatedTypeData.length === 0) {
              const updatedRestaurantData = { ...restaurantData };
              delete updatedRestaurantData[type];
  
              // If the updated restaurant data is empty, remove the restaurant from the meal data
              if (Object.keys(updatedRestaurantData).length === 0) {
                const updatedMealData = { ...prevMeals };
                delete updatedMealData[restaurant];
                return updatedMealData;
              }
  
              return {
                ...prevMeals,
                [restaurant]: updatedRestaurantData,
              };
            }
  
            const updatedRestaurantData = {
              ...restaurantData,
              [type]: updatedTypeData,
            };
  
            return {
              ...prevMeals,
              [restaurant]: updatedRestaurantData,
            };
          }
        }
  
        return prevMeals;
      });
    }
  };

  const sendData = (meal) => {

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

    // send request in the form of ...
    // restaurant, properties of restaurant, 



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
        setMealData(calsAndMacs);
        setMeal({});
      }
      catch(error) {
        console.log('Error fetching restaurant data:', error);
      }
    }
    fetchCalsAndMacs();

  }

  if (restaurantData === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1 className='mainHeading'>Duke Meals</h1>
      </div>
      <div>
        <Accordion>
          {Object.entries(restaurantData).map(([restaurant, nestedData]) => (
            <Accordion.Item key={restaurant} eventKey={restaurant}>
              <Accordion.Header>{restaurant}</Accordion.Header>
              <Accordion.Body>
                <Accordion>
                  {Object.entries(nestedData).map(([type, things]) => (
                    <Accordion.Item key={type} eventKey={type}>
                      <Accordion.Header>{type}</Accordion.Header>
                      <Accordion.Body>
                        <div className="checkbox-list">
                          {things.map((thing) => (
                            <div>
                              <div className='box'>
                                <label key={thing} className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    onClick={(event) => dataGather(event, restaurant, type, thing)}
                                  />
                                <span className="checkbox-text">{thing}</span>
                                </label>
                              </div>
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
      <div className='submitButton'>
        <Button variant="outline-primary" onClick={() => sendData(meal)}>Add Meal</Button>
      </div>
    </>
  );
};

export default MealDisplay;