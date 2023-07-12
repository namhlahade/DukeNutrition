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
            <div className={`fade-transition ${selectedChart === 'Line' ? 'show' : ''}`}>
              {selectedChart === 'Line' && <LineChart />}
            </div>

            <div className={`fade-transition ${selectedChart === 'Pie' ? 'show' : ''}`}>
              {selectedChart === 'Pie' && <PieChart />}
            </div>

            <div className={`fade-transition ${selectedChart === 'Bar' ? 'show' : ''}`}>
              {selectedChart === 'Bar' && <BarChart />}
            </div>

            <div className={`fade-transition ${selectedChart === 'Scatter' ? 'show' : ''}`}>
              {selectedChart === 'Scatter' && <ScatterChart />}
            </div>
          </div>
          <NextMealCard />
        </div>
        <br />
        <br />
        <h1 style={{color: "rgb(0, 0, 0, 0.54"}}>Previous Meals</h1>
        <div id="mealCardList">
          {mealCards?.map((card, index) => (
            <MealCard
              key={index}
              mealID={mealCards[mealCards.length - 1 - index].mealID}
              restaurant={mealCards[mealCards.length - 1 - index].restaurant}
              date={mealCards[mealCards.length - 1 - index].date}
              time={mealCards[mealCards.length - 1 - index].time}
              ingredientList={mealCards[mealCards.length - 1 - index].ingredientList}
              calsAndMacs={mealCards[mealCards.length - 1 - index].calsAndMacs}
            />
          ))}
        </div>
        <Button id="showMoreButton">Show More</Button>
      </div>
    </>
  );
}
