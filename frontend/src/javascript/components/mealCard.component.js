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
import '../../css/mealCard.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function MealCard({mealID, restaurant, date, time, ingredientList}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [isDeleted, setIsDeleted] = useState(false);

  ////////////////////////////////////////////////////////////////////////////////////////

  const deleteCard = () => {
    setIsDeleted(true);
  };

  useEffect(() => {
    const deletedCardIds = JSON.parse(localStorage.getItem("deletedCardIds")) || [];
    if (deletedCardIds.includes(mealID)) {
      setIsDeleted(true);
    }
  }, [mealID]);

  useEffect(() => {
    const deletedCardIds = JSON.parse(localStorage.getItem("deletedCardIds")) || [];
    if (isDeleted) {
      localStorage.setItem("deletedCardIds", JSON.stringify([...deletedCardIds, mealID]));
    } else {
      localStorage.setItem(
        "deletedCardIds",
        JSON.stringify(deletedCardIds.filter((id) => id !== mealID))
      );
    }
  }, [mealID, isDeleted]);

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
    else{
      return;
    }
  }

  if(restaurant && date && ingredientList){
    const ingredients = Object.values(ingredientList);
    console.log(ingredients);
    console.log("restaurant: " + restaurant);

    return (
      <Card class={'mealCard'} id={mealID}>
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
        <CardMedia
          component="img"
          height="150"
          image = {chooseRestaurantImage(restaurant)}
          alt={restaurant}
          class='cardImage'
        />
        <div id='cardContent' subheader={date} >
          <Typography id='ingredientList' variant="body2" color="text.secondary" component="ul">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </Typography>
          <vl id="verticalLine"></vl>
        </div>
        <CardActions disableSpacing>
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>
    );
  }
}