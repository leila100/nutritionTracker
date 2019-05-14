import React from "react";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { ME_QUERY } from "../../graphql/queries";

const BASE_URL = process.env.NODE_ENV === "production" ? "<insert-production-url" : "http://localhost:4000/graphql";

const Login = ({ classes }) => {
  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      });
      const { me } = await client.request(ME_QUERY);
      console.log({ me });
    } catch (err) {
      onFailure(err);
    }
  };

  const onFailure = err => {
    console.error("Error logging in ", err);
  };

  return (
    <div className={classes.root}>
      <Typography component='h1' variant='h3' gutterBottom noWrap style={{ color: "rgb(66, 133, 244)" }}>
        Welcome
      </Typography>
      <GoogleLogin
        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        buttonText='Login with google'
        theme='dark'
      />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
