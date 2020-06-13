import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Forgot from "./components/ForgotPassword";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";
import AdminPacote from "./components/AdminPacote";
import AdminGuias from "./components/AdminGuias";
import AdminGuia from "./components/AdminGuia";
import AdminCreateGuia from "./components/AdminCreateGuia";
import PageNotFound from "./components/PageNotFound";

export default function RouterApp() {
  return (
    <Router>
      <Switch>
        <Route path="/forgotpassword/:token/:id">
          <Forgot />
        </Route>
        <Route path="/Admin/login">
          <AdminLogin />
        </Route>
        <Route path="/Admin/guias">
          <AdminGuias />
        </Route>
        <Route path="/Admin/guia">
          <AdminGuia />
        </Route>
        <Route path="/Admin/create/guia">
          <AdminCreateGuia />
        </Route>
        <Route path="/Admin/pacote">
          <AdminPacote />
        </Route>
        <Route path="/Admin">
          <AdminHome />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}
