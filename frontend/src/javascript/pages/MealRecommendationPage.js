import React from 'react';
import '../../css/MealRecommendation.css';

const MealRecommendationPage = () => {
  const meals = [
    {
      id: 1,
      title: 'Spaghetti Bolognese',
      description: 'Classic Italian pasta dish with meat sauce.',
      image: 'spaghetti.jpg',
    },
    {
      id: 2,
      title: 'Chicken Stir Fry',
      description: 'Healthy and flavorful stir-fried chicken with vegetables.',
      image: 'stir_fry.jpg',
    },
    {
      id: 3,
      title: 'Margherita Pizza',
      description: 'Traditional Italian pizza with tomato, mozzarella, and basil.',
      image: 'pizza.jpg',
    },
  ];

  return (
    <div className="meal-container">
      <h2>Meal Recommendations</h2>
      <div className="card-container">
        {meals.map((meal) => (
          <div className="card" key={meal.id}>
            <img src={meal.image} alt={meal.title} />
            <div className="card-content">
              <h3>{meal.title}</h3>
              <p>{meal.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealRecommendationPage;
