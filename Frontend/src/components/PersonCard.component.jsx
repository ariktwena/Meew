import React, { useState, useEffect } from "react";

import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  useParams,
  // useRouteMatch,
  // NavLink,
} from "react-router-dom";

export default function PersonCard(props) {
    const {persons} = props
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { personId } = useParams();

  // const [info, setInfo] = useState([...props.info]);
  // useEffect(() => setInfo([ ...props.info ]), [props.info]);

  const person = persons.find((p) => p.id === parseInt(personId));

  return (
    <div>
      {/* {JSON.stringify(person)} */}
      {/* {console.log(persons)} */}
      {/* {console.log(person)} */}
      {/* {console.log(personId)} */}
      <h3>Hobby Data:</h3>
      <p>The list of hobbies: {person.hobbies.map(hobby => hobby.name).join(",")}</p>
    </div>
  );
}