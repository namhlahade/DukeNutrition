import React, { Component }  from 'react';
import styled from 'styled-components';
import { LineChart } from '../components/lineChart.component';
import { MealCard } from '../components/mealCard.component';
import { NextMealCard } from '../components/nextMealCard.component';
import "../../css/dashboard.css"
import { ButtonGroup } from '@mui/material';
import { Button } from '@mui/material';
import {Delete} from '@mui/icons-material';
import { useState } from "react";
import { createContext, useContext } from 'react';
import { useDash } from '../context/DashProvider';


export const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const mealCards = useDash().mealCards;

  return (
    <>
      <div id='parentContainer'>
        <div id="topPane">
          <div id='chartContainer'>
            <ButtonGroup id="chartSelectors">
              <Button id = "chartSelector">Line</Button>
              <Button id = "chartSelector">Pie</Button>
              <Button id = "chartSelector">Bar</Button>
              <Button id = "chartSelector">Scatter</Button>
            </ButtonGroup>
            <LineChart />
          </div>
          <NextMealCard />
        </div>
        <br />
        <br />
        <h1>Previous Meals</h1>
        <div id="mealCardList">
          {mealCards?.map((card, index) => (
            <div key={index}>
              <MealCard mealID={card.mealID} restaurant={card.restaurant} date={card.date} ingredients={{ingredient_1: "hey", ingredient_2: "hello", ingredient_3:"hey"}}/>
            </div>
          ))}
        </div>
        <Button id="showMoreButton">Show More</Button>
      </div>
    </>
  );
}
