import React from "react";
import { connect } from "react-redux";
import { GraphQLClient } from "graphql-request";

import { GET_USERS_QUERY } from "../graphql/queries";
import { saveUsers } from "../store/actions";

const BASE_URL = process.env.NODE_ENV === "production" ? "<insert-production-url" : "http://localhost:4000/graphql";

class App extends React.Component {
  async componentDidMount(props) {
    const idToken = localStorage.getItem("token");
    const client = new GraphQLClient(BASE_URL, {
      headers: { authorization: idToken }
    });
    try {
      const { getUsers } = await client.request(GET_USERS_QUERY);
      console.log({ getUsers });
      this.props.saveUsers(getUsers);
    } catch (err) {
      console.log("Error fetching users!", err);
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to Nutrition Tracker!</h1>
        <h2>Users</h2>
        {this.props.users.map(user => (
          <h3>{user.firstName}</h3>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};
export default connect(
  mapStateToProps,
  { saveUsers }
)(App);
