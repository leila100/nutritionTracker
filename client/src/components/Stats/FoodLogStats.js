import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const FoodLogStats = props => {
  const { foodEntries } = props;
  console.log(foodEntries);
  const breakfastCalories = getCaloriesByMealCat(foodEntries, "Breakfast");
  const lunchCalories = getCaloriesByMealCat(foodEntries, "Lunch");
  const dinnerCalories = getCaloriesByMealCat(foodEntries, "Dinner");
  const snackCalories = getCaloriesByMealCat(foodEntries, "Snack");

  return (
    <DivContainer>
      <div>Daily Stats:</div>
      <div>
        Breakfast:
        <div>{breakfastCalories}</div>
      </div>
      <div>
        Lunch:
        <div>{lunchCalories}</div>
      </div>
      <div>
        Dinner:
        <div>{dinnerCalories}</div>
      </div>
      <div>
        Snacks:
        <div>{snackCalories}</div>
      </div>
      <div>
        Total:
        <div>{breakfastCalories + lunchCalories + dinnerCalories + snackCalories}</div>
      </div>
    </DivContainer>
  );
};

const getCaloriesByMealCat = (entries, filter) => {
  return entries
    .filter(entry => entry.meal_category_id.mealCategoryName === filter)
    .map(entry => entry.servingQty * entry.food_id.caloriesPerServ)
    .reduce((total, cal) => total + cal, 0);
};

export default FoodLogStats;

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1000px;
`;
