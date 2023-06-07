import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

const mealDisplay = ({ redirectToHomeContent}) => {
    let restaurantsData;
    fetch('http://127.0.0.1:5000/nextmeal/allRestaurants')
    .then(response => response.json())
    .then(data => {
        // Assign the fetched data to the variable
        restaurantsData = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
    console.log(restaurantsData);

    return (
        <div>restaurantsData</div>
    );
    

};

