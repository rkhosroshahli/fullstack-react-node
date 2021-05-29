import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import { Auth } from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

import './App.css';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(
    () => {
      setIsLoggedIn(true);
    },
    [],
  );

  const logout = useCallback(
    () => {
      setIsLoggedIn(false);
    },
    [],
  );

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userID/places">
          <UserPlaces />
        </Route>
        <Route path="/places/new">
          <NewPlaces />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userID/places">
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
