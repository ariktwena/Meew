import React, { useState, useEffect } from "react";

const AllPersonProxy = (props) => {
  const { facade } = props;

  const emptyArray = [];
  const [persons, setPersons] = useState([...emptyArray]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    facade.getPersonsProxy((data) => {
      console.log(data.all);
      setPersons([...data.all]);
    });
  }, []);

  useEffect(() => {
    facade.getPersonsProxy((data) => {
      console.log(data.all);
      setPersons([...data.all]);
    });
  }, [update]);

  const deletePerson = (event) => {
    console.log(event.target.id);
    const id = event.target.id;
    facade.deletePersonProxy(id, (data) => {
      console.log(data);
      setUpdate((update) => update + 1);
    });
  };

  return (
    <div>
      {/* {JSON.stringify(maps)} */}
      <br />
      <h3 className="text-center">Fetch Persons With Proxy</h3>
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Street</th>
            <th scope="col">Zip</th>
            <th scope="col">City</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.street}</td>
              <td>{person.zip}</td>
              <td>{person.city}</td>
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
    </div>
  );
};

export default AllPersonProxy;
