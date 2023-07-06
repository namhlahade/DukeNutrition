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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Delete} from '@mui/icons-material';
import { Reorder } from '@mui/icons-material';
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

export function MealCard({restaurant, date, ingredients, mealID}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
  const deleteCard = () => {
    const cardElement = document.getElementById(mealID);
    if (cardElement) {
      cardElement.style.display = 'none';
      console.log("mealID: " + mealID);
    }
  }

  if(restaurant && date && ingredients){

    const ingredientList = Array.isArray(ingredients) ? ingredients : [];

    return (
      <Card class={'mealCard'} id={mealID}>
        <CardHeader
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          // title={restaurant}
          subheader={date}
          avatar={
            <IconButton>
              <Typography variant="subtitle2">Reorder</Typography>
              <Reorder />
            </IconButton>}
        />
        <CardMedia
          component="img"
          height="150"
          image = {chooseRestaurantImage(restaurant)}
          alt="pitchforks"
          class='cardImage'
        />
        <CardContent subheader={date} >
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
            <IconButton id="deleteButton" onClick={deleteCard}>
              <Delete/>
            </IconButton>
          <Typography variant="body2" color="text.secondary" component="ul">
            {ingredientList.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
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