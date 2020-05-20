import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Forgot from "./components/forgotpassword";

export default function RouterApp() {
  return (
    <Router>
      <Switch>
        <Route path="/forgotpassword/:token/:id">
          <Forgot />
        </Route>
      </Switch>
    </Router>
  );
}
