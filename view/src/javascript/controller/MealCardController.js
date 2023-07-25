
export class MealCardController {
  constructor() {
  }

  async addMealCard({mealCard, userId, mealCardId}) {
    try {
      const response = await fetch('http://127.0.0.1:5000/meal-cards/addMealCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({meal_card: mealCard, user_id : userId, meal_card_id : mealCardId}),
      });
      const fetchedData = await response.json();
      console.log(fetchedData);
      return fetchedData;
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async deleteMealCard({mealCard, userId, mealCardId}) {
    try {
      const response = await fetch('http://127.0.0.1:5000/meal-cards/deleteMealCard', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({meal_card: mealCard, user_id : userId, meal_card_id : mealCardId}),
      });
      const fetchedData = await response.json();
      console.log(fetchedData);
      return fetchedData;
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async getMealCards({userId}) {
    try {
      const response = await fetch('http://127.0.0.1:5000/meal-cards/getMealCards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id : userId}),
      });
      const fetchedData = await response.json();
      console.log(fetchedData);
      return fetchedData;
    } catch (error) {
      console.log('Error: ', error);
    }
  }

}