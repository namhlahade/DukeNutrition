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

  // Function to handle adding meal to the dashboard history
    const handleAddMeal = (meal) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        const card = <MealCard restaurantName={meal.restaurant} date={today} ingredients={meal.meal_type}/>;

        setMealCards([...mealCards, card]);
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
