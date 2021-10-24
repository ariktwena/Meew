import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useParams,
  // useRouteMatch,
  NavLink,
} from "react-router-dom";
import RestHome from "./RestHome.component";
import Walkers from "./Walker.component";
import DogsByOwner from "./DogsByOwner.component";
import WalkerByDog from "./WalkerOfDog.component";
import CRUD from "./CRUD.component";
import Connect from "./Connect.component";

import AllPersonRest from "./AllPersonRest.component";
import AddPersonRest from "./AddPersonRest.component";
import EditPersonRest from "./EditPersonRest.component";

const Rest = (props) => {
  const { facade, isAdmin } = props;

  return (
    <Router>
      <div>
        {/* {console.log(props)}
          {console.log(props.info)}
          {JSON.stringify(props.info)} */}
        <ul className="header">
          {/* <li>
            <NavLink exact activeClassName="active" to="/rest-home">
              Rest Home
            </NavLink>
          </li> */}
          {isAdmin === true ? (
            ""
          ) : (
            <React.Fragment>
              <li>
                <NavLink exact activeClassName="active" to="/listOfWalker">
                  List of Walkers
                </NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="active" to="/dogsByOwner">
                  Dogs by Owner
                </NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="active" to="/walkerOfDog">
                  Walkers by Dog
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {isAdmin !== true ? (
            ""
          ) : (
            <React.Fragment>
              <li>
                <NavLink exact activeClassName="active" to="/crud">
                  CRUD
                </NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="active" to="/connect">
                  Connect
                </NavLink>
              </li>
            </React.Fragment>
          )}

          {/* <li>
            <NavLink activeClassName="active" to="/person-rest">
              All Persons
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/add-person-rest">
              Add Person
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/edit-person-rest">
              Edit Person
            </NavLink>
          </li> */}
        </ul>

        <Switch>
          <Route exact path="/rest-home">
            <RestHome />
          </Route>
          <Route exact path="/listOfWalker">
            <Walkers facade={facade} />
          </Route>
          <Route exact path="/dogsByOwner">
            <DogsByOwner facade={facade} />
          </Route>
          <Route exact path="/walkerOfDog">
            <WalkerByDog facade={facade} />
          </Route>
          <Route exact path="/crud">
            <CRUD facade={facade} />
          </Route>
          <Route exact path="/connect">
            <Connect facade={facade} />
          </Route>

          <Route path="/person-rest">
            <AllPersonRest facade={facade} />
          </Route>
          <Route path="/add-person-rest">
            <AddPersonRest facade={facade} />
          </Route>
          <Route path="/edit-person-rest">
            <EditPersonRest facade={facade} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Rest;
