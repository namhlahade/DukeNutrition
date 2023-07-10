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
      const addons = meal?.addon?.[0];
      console.log("addons: " + addons?.[0]);
      const mainDish = meal?.main?.[0];
      console.log("mainDish: " + mainDish?.[0]);
      const sides = meal?.side?.[0];
      console.log("sides: " + sides?.[0]);


      const newCard = {
        mealID,
        restaurant,
        date, 
        time,
        ingredients: {
          ingredient_1: mainDish,
          ingredient_2: sides,
          ingredient_3: addons
        }
      };

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
