import React, { Component }  from 'react';
import styled from 'styled-components';
import { LineChart } from '../components/charts/lineChart.component';
import { MealCard } from '../components/mealCard.component';
import "../../css/dashboard.css"
import { Button } from '@mui/material';
import { useState } from "react";
import { createContext, useContext } from 'react';
import { useEffect } from 'react';
import { AuthenticationController } from '../controller/AuthenticationController';
import { MealCardController } from '../controller/MealCardController';
import { useAuth } from '../context/AuthProvider';

const DashContext = createContext();

export const DashProvider = ({ children }) => {
  const [mealCards, setMealCards] = useState([]);
  const authenticationController = new AuthenticationController();
  const mealCardController = new MealCardController();
  const cookies = useAuth().cookies;
  const generateRandomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 8;
    let randomId = '';

    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters[randomIndex];
    }

    console.log("randomId: " + randomId);
    return randomId;
  };

  useEffect(() => {
    // Define an async function inside useEffect to use await
    const fetchData = async () => {
      try {
        // Create instances of the controllers
        const mealCardController = new MealCardController();
        const authenticationController = new AuthenticationController();

        // Get the user ID using the authentication controller
        const userId = await authenticationController.getUserId(cookies);

        // Fetch meal cards using the controller
        const fetchedData = await mealCardController.getMealCards({ userId: userId });

        console.log("fetchedData: ", fetchedData);
        // Assuming fetchedData is an array of meal cards, set the state
        setMealCards(fetchedData);

      } catch (error) {
        console.log('Error: ', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [cookies]);

  function formatIngredients(meal) {
    const ingredientList = {};
  
    for (const ingredientType in meal) {
      const ingredients = meal[ingredientType];
      const formattedIngredients = [];
  
      const ingredientCount = ingredients.length;
      const ingredientOccurrences = {};
  
      // Count the occurrences of each ingredient
      for (let i = 0; i < ingredientCount; i++) {
        const ingredient = ingredients[i];
        ingredientOccurrences[ingredient] = (ingredientOccurrences[ingredient] || 0) + 1;
      }
  
      // Format each ingredient occurrence
      for (const ingredient in ingredientOccurrences) {
        const occurrenceCount = ingredientOccurrences[ingredient];
        const formattedIngredient = `${ingredient} (${occurrenceCount})`;
        formattedIngredients.push(formattedIngredient);
      }
  
      // Assign the formatted ingredients to the ingredientList object
      ingredientList[ingredientType] = formattedIngredients;
    }
  
    return ingredientList;
  }
  

  // Function to handle adding a meal to the dashboard history
  const handleAddMeal = async ({ meal, restaurant, calsAndMacs}) => {
    const userId = await authenticationController.getUserId(cookies).then((userId) => {return userId});
    console.log(meal);
    console.log(restaurant);
    console.log(calsAndMacs);
    if (userId && meal && restaurant && calsAndMacs) {
      console.log(meal);
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
      const yyyy = today.getFullYear();
      const date = mm + '/' + dd + '/' + yyyy;
      var hours = today.getHours();
      var minutes = today.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var time = hours + ':' + minutes + ' ' + ampm;
      const mealID = generateRandomId();

      console.log("restaurant: " + restaurant);
  
      // Iterate over properties and assign values to variables
      const ingredientList = formatIngredients(meal);
      
      console.log(JSON.stringify(ingredientList));
    
  
      const newCard = {
        mealID,
        restaurant,
        date,
        time,
        ingredientList,
        calsAndMacs
      };

      console.log(newCard);
      // Call the addMealCard method from the controller to add the meal card on the server
    const response = await mealCardController.addMealCard({
      mealCard: newCard,
      userId: userId,
      mealCardId: mealID
    });

    console.log(response); // Optional: Log the response from the server

    // Update the mealCards state with the new meal card
    setMealCards([...mealCards, newCard]);
  };
  };

  return (
    <DashContext.Provider value={{ handleAddMeal, mealCards }}>
      {children}
    </DashContext.Provider>
  );

}

export const useDash = () => {
  return useContext(DashContext);
};
