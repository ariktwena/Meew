import React, { useState, useEffect } from "react";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // NavLink,
  // Redirect,
  // useLocation,
  Prompt,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import Header from "./components/Header.component";
import Home from "./components/Home.component";
import Proxy from "./components/Proxy.component";
import Rest from "./components/Rest.component";

import NoMatch from "./components/NoMatch.component";
import Login from "./components/Login.component";
import PrivateRoute from "./components/PrivateRoute.component";
import "./App.css";

function App(props) {
  const { facade, utils } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [displayError, setDisplayError] = useState("");
  let history = useHistory();


  const setLoginStatus = (status, pageToGoTo) => {
    // console.log(pageToGoTo)
    //Redurect to home if logut is pressed ==> pageToGoTo === "undefined"
    if (typeof pageToGoTo === "undefined") {
      pageToGoTo = "/";
      // console.log(pageToGoTo)
    }
    setIsLoggedIn(status);
    history.push(pageToGoTo);
  };

  const login = (user, pass, from) => {
    /*TODO*/
    utils
      .login(user, pass)
      .then((res) => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
          console.log("YES");
          setIsAdmin(true);
        } else {
          console.log("NO");
          setIsAdmin(false);
        }
        setLoginStatus(true, from);
        // setIsLoggedIn(true);
        setDisplayError("");  
      })
      .catch((error) => {
        error.fullError.then((errorMsg) => {
          console.log(errorMsg);
          setDisplayError(
            // "Error: Status: " +
            //   errorMsg.code +
            //   " -  Message: " +
            errorMsg.message
          );
        });
      });
  };

  const clearError = () => {
    setDisplayError("");
  };

  return (
    <div>
      {console.log(isAdmin)}
      {/* {console.log(props.bookFacade.getBooks)} */}
      <Header
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
      />
      <Switch>
        <Route exact path="/">
          <Home utils={utils} isLoggedIn={isLoggedIn} />
        </Route>

        <Route path="/proxy">
          <Proxy facade={facade} />
        </Route>
        {/* <PrivateRoute
          path="/proxy"
          isLoggedIn={isLoggedIn}
          component={Proxy}
          facade={facade}
        /> */}
        <Route path="/rest">
          <Rest facade={facade} isAdmin={isAdmin} />
        </Route>
        {/* <PrivateRoute
          path="/rest"
          isLoggedIn={isLoggedIn}
          component={Rest}
          facade={facade}
        /> */}

        <Route path="/login-out">
          <Login
            loginMsg={isLoggedIn ? "Logout" : "Login"}
            isLoggedIn={isLoggedIn}
            setLoginStatus={setLoginStatus}
            utils={utils}
            login={login}
            displayError={displayError}
            clearError={clearError}
          />
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
