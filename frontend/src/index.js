
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
import "assets/demo/demo.css?v=1.2.0";
// pages
import Index from "views/Index.js";
import LoginPage from "views/LoginPage.js";
import RegisterPage from "views/RegisterPage.js";
import Catalogo from "views/Catalogo.js";
import Detalle from "views/Detalle.js";
// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={(props) => <Index {...props} />} />
      <Route
         exact path="/LoginPage"
        render={(props) => <LoginPage {...props} />}
      />
      <Route
         exact path="/RegisterPage"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route
         exact path="/Catalogo"
        render={(props) => <Catalogo {...props} />}
      />
      <Route
         exact path="/Detalle/:valor"
        render={(props) => <Detalle {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
