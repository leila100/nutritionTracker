import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./pages/App";
import Auth from "./pages/Auth";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/login' component={Auth} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
