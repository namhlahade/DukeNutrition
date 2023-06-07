import React, { useState, useEffect } from 'react';

const MealDisplay = ({ redirectToHomeContent }) => {
  const [restaurantsData, setRestaurantsData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/nextmeal/allRestaurants')
      .then(response => response.json())
      .then(data => {
        // Update the state with the fetched data
        setRestaurantsData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  console.log(restaurantsData);

  return (
    <div>
        <h1>This is a test</h1>
    </div>
  );
};

export default MealDisplay;
