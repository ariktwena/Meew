import React, { useState, useEffect } from "react";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useParams,
  useRouteMatch,
  // NavLink,
} from "react-router-dom";
import PersonCard from "./PersonCard.component";

const AllPersonRest = (props) => {
  const { facade } = props;
  let { path, url } = useRouteMatch();

  const emptyArray = [];
  const [persons, setPersons] = useState([...emptyArray]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    facade.getPersonsRest((data) => {
      console.log(data);
      setPersons([...data]);
    });
  }, []);

  useEffect(() => {
    facade.getPersonsRest((data) => {
      console.log(data);
      setPersons([...data]);
    });
  }, [update]);

  const deletePerson = (event) => {
    console.log(event.target.id);
    const id = event.target.id;
    facade.deletePersonRest(id, (data) => {
      console.log(data);
      setUpdate(() => update + 1);
    });
  };

  return (
    <div>
      {/* {JSON.stringify(maps)} */}
      <br />
      <h3 className="text-center">Fetch Persons With Rest</h3>
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Job</th>
            <th scope="col">Nickname</th>
            <th scope="col">Hobbies</th>
            <th scope="col">Link</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id} style={{ cursor: "pointer" }}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.job.title}</td>
              <td>{person.nickName.nickName}</td>
              {/* <td>{person.hobbies.map(hobby => <span key={hobby.id}>{hobby.name}</span>)}</td> */}
              {/* <td>{person.hobbies[0].name}</td> */}
              <td>
                {person.hobbies.length > 1
                  ? person.hobbies[0].name +
                    " (+" +
                    (person.hobbies.length - 1) +
                    ")"
                  : person.hobbies[0].name}
              </td>
              <td>
                <Link to={`${url}/${person.id}`}>View hobbies</Link>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  id={person.id}
                  onClick={deletePerson}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a person.</h3>
        </Route>
        <Route path={`${path}/:personId`}>
          <PersonCard persons={persons} />
        </Route>
      </Switch>
    </div>
  );
};

export default AllPersonRest;
