import React, { Component }  from 'react';
import styled from 'styled-components';
import { LineChart } from '../components/lineChart.component';
import { MealCard } from '../components/mealCard.component';
import "../../css/dashboard.css"
import { Button } from '@mui/material';

const Container = styled.div`
  background: #36393e;
  display: flex;
  justify-content: center; // 1
  flex-flow: column wrap; // 2
  width: 100%;
  height: 100%;
`;
const List = styled.div`
  display: flex;
  justify-content: center; // 3
  flex-flow: row wrap; // 4
`;

const Card = styled.div`
  margin: 20px;
  background: #fff;
  height: 400px;
  width: 400px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: column; // 5 
  justify-content: center;
  align-items: center;
`;

function RecommendationsPage() {
  return (
    <>
      <div id='parentContainer' >
        <LineChart />
        <br />
        <br />
        <h1>Previous Meals</h1>
        <div id='mealCardContainer'>
          <MealCard id='mealCard'/>
          <MealCard id='mealCard'/>
          <MealCard id='mealCard'/>
        </div>
        <Button id="showMoreButton">Show More</Button>
      </div>
    </>
  );
};

export default RecommendationsPage;