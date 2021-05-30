import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Register from "./pages/Register.jsx";
import Transactions from "./pages/Transactions.jsx";
import ConfirmRefund from "./pages/ConfirmRefund.jsx";
import Payment from "./pages/Payment.jsx";
import Header from "./pages/Header.jsx";
import Footer from "./pages/Footer.jsx";
import Home from "./pages/Home.jsx";
import React, { useState, Fragment, Component } from "react";
import "./assets/css/adminlte.min.css";
import "./assets/css/adminlte.min.css";
import "./assets/plugins/fontawesome-free/css/all.min.css";
import { Route, BrowserRouter, Router, Switch } from "react-router-dom";
import { Redirect } from "react-router";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user") ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : Component == Register||Component == PageNotFound ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <MainLayout>
          <Login {...props} />
        </MainLayout>
      )
    }
  />
);

const MainLayout = (props) => props.children;
const AltLayout = (props) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <AppRoute exact path="/login" layout={MainLayout} component={Login} />
          <AppRoute
            exact
            path="/register"
            layout={MainLayout}
            component={Register}
          />
          <AppRoute exact path="/" layout={AltLayout} component={Home} />
          <AppRoute
            exact
            path="/confirm-refund"
            layout={AltLayout}
            component={ConfirmRefund}
          />
          <AppRoute
            exact
            path="/transactions"
            layout={AltLayout}
            component={Transactions}
          />
          <AppRoute
            exact
            path="/pay-fees"
            layout={AltLayout}
            component={Payment}
          />
           <AppRoute
            exact
            path="*"
            layout={AltLayout}
            component={PageNotFound}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
