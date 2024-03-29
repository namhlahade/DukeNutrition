import * as React from 'react';
import { css, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Tooltip} from "react-tooltip"; 
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Delete} from '@mui/icons-material';
import { Reorder } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { AuthenticationController } from '../controller/AuthenticationController';
import {MealCardController} from '../controller/MealCardController';
import { useAuth } from '../context/AuthProvider';
import '../../css/mealCard.css'

export const MealCard = ({ mealID, restaurant, date, time, ingredientList, calsAndMacs }) => {
  const [expanded, setExpanded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const cookies = useAuth().cookies;

  const mealCardController = new MealCardController();
  const authenticationController = new AuthenticationController();

  const deleteCard = async () => {
    // Call the deleteMealCard method from the controller to delete the meal card on the server
    const userId = await authenticationController.getUserId(cookies).then((userId) => {return userId});
    await mealCardController.deleteMealCard({ mealCard: mealID, userId: userId, mealCardId: mealID });
    setIsDeleted(true);
    window.location.reload(); // Refresh the page
  };


  // Rest of your component code...

  // If the meal card is deleted, don't render it
  if (isDeleted) {
    return null;
  }

  const chooseRestaurantImage = (restaurant) => {
    if(restaurant === "Pitchforks"){
      return require('../../resources/images/pitchforks_label.png');
    }
    else if(restaurant === "Bella_Union"){
      return require('../../resources/images/bella_union_label.png');
    }
    else if(restaurant === "Ginger_and_Soy"){
      return require('../../resources/images/ginger_and_soy_label.png');
    }
    else if(restaurant === "Nutrionix"){
      return require('../../resources/images/nutrionix_label.png');
    }
    else{
      return;
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  if(restaurant && date && ingredientList && calsAndMacs){
    console.log(ingredientList);
    console.log("restaurant: " + restaurant);

    return (
      <Card class={'mealCard'} id={mealID}>
        <br/>
        <div id='cardHeaderDiv'>
          <IconButton>
              <Reorder />
              {/* <Tooltip title="Tooltip for the register button" placement="top" place="top" effect="solid">
              </Tooltip> */}
          </IconButton>
          <Typography id="dateTime"  color="text.secondary"> 
            {time}
            <br/>
            {date}
          </Typography>
          <IconButton id="deleteButton" onClick={deleteCard}>
            <Delete/>
          </IconButton>
        </div>
        <br/>
        <CardMedia
          component="img"
          height="150"
          image = {chooseRestaurantImage(restaurant)}
          alt={restaurant}
          class='cardImage'
        />
        <br/>
        <br/>
        <div id='cardContent' subheader={date} >
          <div class="scrollable">
            <div id='ingredientList' variant="body2" color="text.secondary" component="ul">
              {Object.entries(ingredientList).map(([ingredientType, ingredients]) => (
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
              ))}
            </div>
          </div>
          
          <ul id='macroCardList'>
            {Object.entries(calsAndMacs).map(([key, value]) => (
              <li key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>{capitalizeFirstLetter(key)}:</strong></span>
                <span style={{ marginLeft: '0.5em' }}>{key === 'calories' ? value : `${value}g`}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    );
  } else{
    console.log("Meal Card not displayed in dash");
  }
}