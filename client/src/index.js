import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import { reducer } from "./store/reducers";
import App from "./pages/App";
import Auth from "./pages/Auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, logger)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Auth} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
