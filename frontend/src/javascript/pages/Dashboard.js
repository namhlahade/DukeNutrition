import React, { Component }  from 'react';
import styled from 'styled-components';
import { LineChart } from '../components/lineChart.component';
import { MealCard } from '../components/mealCard.component';
import "../../css/dashboard.css"
import { Button } from '@mui/material';
import {Delete} from '@mui/icons-material';
import { useState } from "react";
import { createContext, useContext } from 'react';
import { useDash } from '../context/DashProvider';


export const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const mealCards = useDash().mealCards;

  const handleDeleteCard = (card) => {
    
  };

  return (
    <>
      <div id='parentContainer'>
        <LineChart />
        <br />
        <br />
        <h1>Previous Meals</h1>
        <div id="mealCardList">
          {mealCards.map((card, index) => (
            <div key={index}>
              {card}
            </div>
          ))}
        </div>
        <Button id="showMoreButton">Show More</Button>
      </div>
    </>
  );
}
