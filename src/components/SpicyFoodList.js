import React, { useState } from 'react';
import { spicyFoods, getNewSpicyFood } from '../data';

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [heat, setHeat] = useState(foods);
  const [filterBy, setFilterBy] = useState('All');
  // console.log(foods);

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArr = [...foods, newFood];
    setFoods(newFoodArr);
    // console.log(newFood);
  }

  function handleLiClick(id) {
    const newFoodArray = foods.filter((food) => food.id !== id);
    setFoods(newFoodArray);
  }

  const handleMoreHeat = (food) => {
    console.log(food);
    setHeat(food.heatLevel++);
  };

  const handleLessHeat = (food) => {
    console.log(food);
    setHeat(food.heatLevel--);
  };

  function handleFilterChange(e) {
    setFilterBy(e.target.value);
  }

  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === 'All') {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

  const foodList = foodsToDisplay.map((food) => (
    <>
      <li key={food.id} onClick={() => handleLiClick(food.id)}>
        {food.name} | Heat: {food.heatLevel < 6 ? '🔥' : '🧨'}{' '}
        {food.heatLevel > 10 ? '☠️' : ''} {food.heatLevel}| Cuisine:{' '}
        {food.cuisine}
      </li>
      <>
        <button onClick={() => handleLessHeat(food)}>- HEAT</button>
        <button onClick={() => handleMoreHeat(food)}>+ HEAT</button>
      </>
    </>
  ));
  console.log(foodList);

  return (
    <div>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <div id="top-div"><button id="main-btn" onClick={handleAddFood}>Add New Food</button></div>
      <ul style={{ listStyleType: 'none' }}> {foodList} </ul>
    </div>
  );
}

export default SpicyFoodList;
