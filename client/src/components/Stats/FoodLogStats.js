import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Bar } from "react-chartjs-2";

class FoodLogStats extends React.Component {
  render(props) {
    const { foodEntries } = this.props;
    console.log(foodEntries);
    const breakfastCalories = this.getCaloriesByMealCat(foodEntries, "Breakfast");
    const lunchCalories = this.getCaloriesByMealCat(foodEntries, "Lunch");
    const dinnerCalories = this.getCaloriesByMealCat(foodEntries, "Dinner");
    const snackCalories = this.getCaloriesByMealCat(foodEntries, "Snack");

    const data = {
      labels: ["Breakfast", "Lunch", "Dinner", "Snacks"],
      datasets: [
        {
          label: "Calories",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#2196F3",
          borderColor: "#2196F3",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "red",
          pointBackgroundColor: "red",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#2196F3",
          pointHoverBorderColor: "#2196F3",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [breakfastCalories, lunchCalories, dinnerCalories, snackCalories]
        }
      ]
    };

    return (
      <>
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
        <div>
          <h2>Calories / Meal Category</h2>
          <Bar
            ref='chart'
            data={data}
            width={500}
            height={350}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                      stepSize: 100
                    }
                  }
                ]
              }
            }}
          />
        </div>
      </>
    );
  }
  getCaloriesByMealCat = (entries, filter) => {
    return entries
      .filter(entry => entry.meal_category_id.mealCategoryName === filter)
      .map(entry => entry.servingQty * entry.food_id.caloriesPerServ)
      .reduce((total, cal) => total + cal, 0);
  };
}

export default FoodLogStats;

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1000px;
`;
