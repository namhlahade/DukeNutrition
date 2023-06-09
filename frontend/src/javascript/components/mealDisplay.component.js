import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

function changeColor() {
  var checkbox = document.getElementById("colorCheckbox");
  var box = document.getElementById("myBox");

  if (checkbox.checked) {
    box.style.backgroundColor = "red";
  } else {
    box.style.backgroundColor = "blue";
  }
}

const MealDisplay = () => {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/nextMeal/allRestaurants');
        const data = await response.json();
        setRestaurantData(data);
        console.log("Data from allRestaurants API call")
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
    // <div>
    //   {Object.entries(restaurantData).map(([outerKey, nestedData]) => (
    //     <div key={outerKey}>
    //       <h1>{outerKey}</h1>
    //       <div>
    //         {Object.entries(nestedData).map(([type, things]) => (
    //           <div key={type}>
    //             <h2>{type}</h2>
    //             <div>
    //               {things.map((thing) => (
    //                 <h4 key={thing}>{thing}</h4>
    //               ))}
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   ))}
    // </div>

    <Accordion>
      {Object.entries(restaurantData).map(([outerKey, nestedData]) => (
        <Accordion.Item eventKey={outerKey}>
          <Accordion.Header>{outerKey}</Accordion.Header>
          <Accordion.Body>
            <Accordion>
            <div>
              {Object.entries(nestedData).map(([type, things]) => (
                <Accordion.Item eventKey={type}>
                  <Accordion.Header>{type}</Accordion.Header>
                    <Accordion.Body>
                      <div>
                        {things.map((thing) => (
                          <h4 key={thing}>{thing}</h4>
                        ))}
                      </div>
                    </Accordion.Body>
                </Accordion.Item>
              ))}
            </div>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      ))}
  </Accordion>
  );
};

export default MealDisplay;