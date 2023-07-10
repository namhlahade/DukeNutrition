import React, { Component }  from 'react';
import styled from 'styled-components';
import {destroyLineChart} from '../components/charts/lineChart.component';
import { LineChart } from '../components/charts/lineChart.component';
import { PieChart } from '../components/charts/pieChart.component';
import { BarChart } from '../components/charts/barChart.component';
import { ScatterChart } from '../components/charts/scatterChart.component';
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
  const [selectedChart, setSelectedChart] = useState('Line');

  const handleChartClick = (chartType) => {
    //destroyLineChart();
    setSelectedChart(chartType);
  };

  return (
    <>
      <div id='parentContainer'>
        <div id="topPane">
          <div id='chartContainer'>
          <div id="chartSelectors">
            <label className="chartSelector">
              <input className="chartSelector" type="radio" value="Line" onClick={() => handleChartClick('Line')} />
              Line
            </label>
            <label className="chartSelector">
              <input className="chartSelector" type="radio" value="Pie" onClick={() => handleChartClick('Pie')} />
              Pie
            </label>
            <label className="chartSelector">
              <input className="chartSelector" type="radio" value="Bar" onClick={() => handleChartClick('Bar')} />
              Bar
            </label>
            <label className="chartSelector" >
              <input className="chartSelector" type="radio" value="Scatter" onClick={() => handleChartClick('Scatter')} />
              Scatter
            </label>
          </div>
            {selectedChart === 'Line' && <LineChart />}
            {selectedChart === 'Pie' && <PieChart />}
            {selectedChart === 'Bar' && <BarChart />}
            {selectedChart === 'Scatter' && <ScatterChart />}
          </div>
          <NextMealCard />
        </div>
        <br />
        <br />
        <h1>Previous Meals</h1>
        <div id="mealCardList">
          {mealCards?.map((card, index) => (
            <div key={index}>
              <MealCard mealID={card.mealID} restaurant={card.restaurant} date={card.date} time={card.time} ingredients={card.ingredients}/>
            </div>
          ))}
        </div>
        <Button id="showMoreButton">Show More</Button>
      </div>
    </>
  );
}
