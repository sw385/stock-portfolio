import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import {
  HomeContainer,
  NotFound,
  SignInContainer,
  RegisterContainer,
  PortfolioContainer,
  TransactionsContainer,
} from "./components"

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/home" component={HomeContainer} />
          <Route exact path="/signin" component={SignInContainer} />
          <Route exact path="/register" component={RegisterContainer} />
          <Route exact path="/portfolio" component={PortfolioContainer} />
          <Route exact path="/transactions" component={TransactionsContainer} />
          <Route component={NotFound} />
          <div></div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
