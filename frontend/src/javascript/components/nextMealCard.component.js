import * as React from 'react';
import { css, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import {Button} from '@mui/material';
import { useEffect, useState } from "react";
import '../../css/mealCard.css'

export function NextMealCard() {
  const [nextMeal, setNextMeal] = useState({});
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [restaurant, setRestaurant] = useState(["Pitchforks"]);

  ////////////////////////////////////////////////////////////////////////////////////////

  const fetchNextMeal = async () => {
    const userid = "86a75215-6fb8-4d9e-8d89-960a71288ff6";
  
    try {
      const response = await fetch('http://127.0.0.1:5000/dashboard/getNextSuggestedMeal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: userid, restaurant: restaurant[0] }),
      });
  
      const fetchedData = await response.json();
      setNextMeal(fetchedData);
      console.log(fetchedData['meal_details']);
      console.log(fetchedData['macros']);

    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchNextMeal();
  }, [restaurant]);


  const fetchRestaurantsList = async () => {
    const userid = "86a75215-6fb8-4d9e-8d89-960a71288ff6";
  
    try {
      const response = await fetch('http://127.0.0.1:5000/dashboard/getRestaurantsList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: userid, restaurant: restaurant }),
      });
  
      const fetchedData = await response.json();
      setRestaurantsList(fetchedData);
      console.log(fetchedData);

    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchRestaurantsList();
  }, []);

  const handleClick = (restaurantA) => {
    setRestaurant(restaurantA);
  };


  const chooseRestaurantImage = (restaurant) => {
    console.log("restaurant: " + restaurant);
    if(restaurant === "Pitchforks"){
      console.log("pitchforksImage");
      return require('../../resources/images/pitchforks_label.png');
    }
    else if(restaurant === "Bella_Union"){
      console.log("bellaUnionImage");
      return require('../../resources/images/bella_union_label.png');
    }
    else if(restaurant === "Ginger_and_Soy"){
      console.log("gingerAndSoyImage");
      return require('../../resources/images/ginger_and_soy_label.png');
    }
    else{
      console.log("no image");
      return;
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  if(restaurant){
    console.log("restaurant: " + restaurant);

    return (
      <Card class={'mealCard'} id='nextMealCard'>
        <br/>
        <div id='cardHeading'>
          <span><h2>Meal<br/>Suggestion</h2></span>
        </div>
        <br/>
        <CardMedia
          component="img"
          height="135"
          image={chooseRestaurantImage(restaurant[0])}
          alt={restaurant}
          class='cardImage'
        />
        <br/>
        <br/>
        <div id='cardContentSuggestMeal'>
          <div class="scrollable">
            <div id='ingredientList' variant="body2" color="text.secondary" component="ul">
              {nextMeal && nextMeal['meal_details'] && (Object.entries(nextMeal['meal_details'])?.map(([ingredientType, ingredients]) => (
                <div key={ingredientType}>
                  <span><strong>{capitalizeFirstLetter(ingredientType)}</strong></span>
                  <ul>
                    {Array.isArray(ingredients) ? (
                      ingredients.map((ingredient, index) => (
                        <span><li key={index}>{ingredient}</li></span>
                      ))
                    ) : (
                      <span><li>{ingredients}</li></span>
                    )}
                  </ul>
                </div>
              )))}
            </div>
          </div>
          <div id="nextMealMacroListContainer">
          <ul id='macroCardList'>
            {nextMeal && nextMeal['macros'] && (Object.entries(nextMeal['macros'])?.map(([key, value]) => (
              <li key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>{capitalizeFirstLetter(key)}:</strong></span>
                <span style={{ marginLeft: '0.5em' }}>{key === 'Calories' ? value : `${value}g`}</span>
              </li>
            )))}
          </ul>
          </div>
          <div id='restarauntButtons'>
            <br/>
            {restaurantsList && restaurantsList.map((restaurant, index) => (
              <Button id="restaurantButton" key={index} onClick={() => handleClick(restaurant)}>{restaurant.toString().replace(/_/g, ' ')}</Button>
            ))}
          </div>
        </div>
      </Card>
    );
  } else{
    console.log("Meal Card not displayed in dash");
  }
}