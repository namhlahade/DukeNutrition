import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const MealDisplay = () => {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/nextMeal/allRestaurants');
        const data = await response.json();
        setRestaurantData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchData();
  }, []);

  if (restaurantData === null) {
    return <div>Loading...</div>;
  }

  return (
    <Accordion>
      {Object.entries(restaurantData).map(([outerKey, nestedData]) => (
        <Card key={outerKey}>
          <Accordion.Toggle as={Card.Header} eventKey={outerKey}>
            {outerKey}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={outerKey}>
            <Card.Body>
              {Object.entries(nestedData).map(([innerKey, value]) => (
                <Accordion key={innerKey}>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={innerKey}>
                      {innerKey}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={innerKey}>
                      <Card.Body>
                        <ul>
                          {value.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default MealDisplay;