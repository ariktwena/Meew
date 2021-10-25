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
import ProxyHome from "./ProxyHome.component";
import ParallelDTO from "./ParallelDTO.component";
import Country from "./Country.component";
import AllPersonProxy from "./AllPersonProxy.componen";
import AddPersonProxy from "./AddPersonProxy.component";
import EditPersonProxy from "./EditPersonProxy.component";
import Jokes from "./Jokes.component";

const Proxy = (props) => {
  const { facade } = props;

  return (
    <Router>
      <div>
        {/* {console.log(props)}
          {console.log(props.info)}
          {JSON.stringify(props.info)} */}
        <ul className="header">
          <li>
            <NavLink exact activeClassName="active" to="/proxy-home">
              Proxy Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/parallel-dto">
              Parallel DTO
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/find-country">
              Find Country
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/jokes">
              Jokes
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/person-proxy">
              All Persons
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/add-person-proxy">
              Add Person
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/edit-person-proxy">
              Edit Person
            </NavLink>
          </li>
        </ul>

        <Switch>
          <Route exact path="/proxy-home">
            <ProxyHome />
          </Route>
          <Route path="/parallel-dto">
            <ParallelDTO facade={facade} />
          </Route>
          <Route path="/find-country">
            <Country facade={facade} />
          </Route>
          <Route path="/jokes">
            <Jokes facade={facade} />
          </Route>
          <Route path="/person-proxy">
            <AllPersonProxy facade={facade} />
          </Route>
          <Route path="/add-person-proxy">
            <AddPersonProxy facade={facade} />
          </Route>
          <Route path="/edit-person-proxy">
            <EditPersonProxy facade={facade} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Proxy;
