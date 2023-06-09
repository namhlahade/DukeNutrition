import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import styles from '../../css/mealDisplay.css'

const MealDisplay = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [boxColor, setBoxColor] = useState("transparent")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/nextMeal/allRestaurants');
        const data = await response.json();
        setRestaurantData(data);
        console.log("Data from allRestaurants API call");
        console.log(data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchData();
  }, []);

  const changeColor = (event) => {
    const checkbox = event.target;

    if (checkbox.checked) {
      setBoxColor("transparent")
    } else {
      setBoxColor("red")
    }
    checkbox.parentElement.style.backgroundColor = boxColor;
  };

  if (restaurantData === null) {
    return <div>Loading...</div>;
  }

  return (
    <Accordion>
      {Object.entries(restaurantData).map(([outerKey, nestedData]) => (
        <Accordion.Item key={outerKey} eventKey={outerKey}>
          <Accordion.Header>{outerKey}</Accordion.Header>
          <Accordion.Body>
            <Accordion>
              {Object.entries(nestedData).map(([type, things]) => (
                <Accordion.Item key={type} eventKey={type}>
                  <Accordion.Header>{type}</Accordion.Header>
                  <Accordion.Body>
                    <div className="checkbox-list">
                      {things.map((thing) => (
                        <div>
                          <label key={thing} className="custom-checkbox">
                          <input type="checkbox" onClick={changeColor} />
                          <span className="checkbox-text">{thing}</span>
                          </label>
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
  );
};

export default MealDisplay;