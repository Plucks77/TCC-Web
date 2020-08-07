import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Forgot from "./pages/ForgotPassword";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import AdminPacote from "./pages/AdminPacote";
import AdminGuias from "./pages/AdminGuias";
import AdminGuia from "./pages/AdminGuia";
import AdminCreateGuia from "./pages/AdminCreateGuia";
import AdminCreatePacote from "./pages/AdminCreatePacote";
import PageNotFound from "./pages/PageNotFound";

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
        <Route path="/Admin/create/pacote">
          <AdminCreatePacote />
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
