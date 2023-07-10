import React, { Component }  from 'react';
import styled from 'styled-components';
import { LineChart } from '../components/charts/lineChart.component';
import { MealCard } from '../components/mealCard.component';
import "../../css/dashboard.css"
import { Button } from '@mui/material';
import { useState } from "react";
import { createContext, useContext } from 'react';
import { useEffect } from 'react';

const DashContext = createContext();

export const DashProvider = ({ children }) => {
  const [mealCards, setMealCards] = useState([]);

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
    // Retrieve meal cards from local storage when component initializes
    const mealCardsLocalStorage = JSON.parse(localStorage.getItem('mealCards')) || [];
    setMealCards(mealCardsLocalStorage);
  }, []);

  // Function to handle adding a meal to the dashboard history
  const handleAddMeal = ({meal, restaurant}) => {
    if (meal && restaurant) {
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
      const ingredientList = {};
      for (const [itemType, itemArray] of Object.entries(meal)) {
        if (Array.isArray(itemArray)) {
          var itemCounter = 0;
          for (let i = 0; i < itemArray.length; i++) {
            const ingredientKey = `${itemType}_${itemArray[i]}`;
            if (ingredientKey in ingredientList) {
              itemCounter++;
            } else {
              itemCounter = 1;
            }
          }
          ingredientList[itemType] = `${itemType.charAt(0).toUpperCase() + itemType.slice(1)}: ${itemArray[itemArray.length - 1]} (${itemCounter})`;
        }
      }
      
      console.log(JSON.stringify(ingredientList));
    
  
      const newCard = {
        mealID,
        restaurant,
        date,
        time,
        ingredientList,
      };

      console.log(newCard);

      setMealCards([...mealCards, newCard]);

      // Store the meal card in local storage
      const mealCardsLocalStorage = JSON.parse(localStorage.getItem('mealCards')) || [];
      mealCardsLocalStorage.push(newCard);
      localStorage.setItem('mealCards', JSON.stringify(mealCardsLocalStorage));
    }
  };

  return (
    <DashContext.Provider value={{ handleAddMeal, mealCards }}>
      {children}
    </DashContext.Provider>
  );
};

export const useDash = () => {
  return useContext(DashContext);
};
