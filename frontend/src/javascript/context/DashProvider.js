import React, { Component }  from 'react';
import styled from 'styled-components';
import { LineChart } from '../components/lineChart.component';
import { MealCard } from '../components/mealCard.component';
import "../../css/dashboard.css"
import { Button } from '@mui/material';
import { useState } from "react";
import { createContext, useContext } from 'react';

const DashContext = createContext();

export const DashProvider = ({children}) => {

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
    

  // Function to handle adding meal to the dashboard history
    const handleAddMeal = ({restaurant, mealType, ingredients}) => {
        if(restaurant && mealType){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            const mealID = generateRandomId();
            const card = <MealCard mealID={mealID} restaurant={restaurant} date={today} ingredients={{ingredient_1: "hey", ingredient_2: "hello", ingredient_3:"hey"}}/>;
            console.log("restaurant: " + restaurant);
            console.log("meal_type: " + mealType);
            console.log("randomId: " + mealID);
            setMealCards([...mealCards, card]);
        }
    };

  return (
    <>
      <DashContext.Provider value={{handleAddMeal, mealCards}}>
        {children}
      </DashContext.Provider>
    </>
  );
}

export const useDash = () => {
  return useContext(DashContext);
};
