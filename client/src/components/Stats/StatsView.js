import React from "react";
import Header from "../Reusables/Header";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { GraphQLClient } from "graphql-request";

// import StatsDashboard from "./StatsDashboard";
import FoodLogStats from "./FoodLogStats";
import { GET_FOOD_ENTRIES_BY_USER_QUERY } from "../../graphql/queries";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    height: 40,
    width: 100,
    color: "white",
    textDecoration: "none",
    disableUnderline: true
  },
  container: {
    display: "flex",
    width: "1000px",
    maxWidth: "1500px",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  }
});

const BASE_URL = process.env.NODE_ENV === "production" ? "<insert-production-url" : "http://localhost:4000/graphql";

class StatsView extends React.Component {
  state = {
    foodEntries: [],
    breakfastCalories: 0,
    lunchCalories: 0,
    dinnerCalories: 0,
    snackCalories: 0
  };

  componentDidMount = async () => {
    const client = new GraphQLClient(BASE_URL);
    const variables = { userId: 1 };
    try {
      const foodEntries = await client.request(GET_FOOD_ENTRIES_BY_USER_QUERY, variables);
      this.setState({ foodEntries: foodEntries.getFoodEntriesByUserId });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Header />
        <Grid container spacing={8} lg={4} direction='row' justify='center' alignItems='center'>
          <div className={classes.container}>
            {/* <StatsDashboard /> */}
            <FoodLogStats foodEntries={this.state.foodEntries} />
          </div>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(StatsView);
