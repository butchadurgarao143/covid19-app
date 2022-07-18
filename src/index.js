import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import Dashboard from "views/Dashboard";
import Footer from "components/Footer";
import { Route, Switch, HashRouter } from "react-router-dom";
import CountryDetail from "views/CountryDetail";

ReactDOM.render(
  <HashRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/:country" exact component={CountryDetail} />
      </Switch>
      <Footer />
  </HashRouter>,
  document.getElementById("root")
);
