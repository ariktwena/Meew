import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function CRUDAll(props) {
  const { dogs, editDog, deleteDog } = props;

  const editSelectedDog = (event) => {
    editDog(parseInt(event.target.id));
  };

  const deleteSelectedDog = (event) => {
    deleteDog(parseInt(event.target.id));
  };

  return (
    <div>
      {/* {JSON.stringify(perosnList)} */}
      <table className="table" >
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Breed</th>
            <th>Gender</th>
            <th>Image</th>
            <th>Birthdate</th>
            <th>Walkers</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog) => (
            <tr key={dog.id}>
              <td>{dog.id}</td>
              <td>{dog.name}</td>
              <td>{dog.breed}</td>
              {dog.gender === "M" ? <td>Male</td> : <td>Female</td>}
              <td><img src={dog.image} alt="doog" width="30" height="30"></img></td>
              <td>{dog.birthdate.day}-{dog.birthdate.month}-{dog.birthdate.year}</td>
              <td>{dog.walkers.length}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  id={dog.id}
                  onClick={editSelectedDog}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-dark btn-sm"
                  id={dog.id}
                  onClick={deleteSelectedDog}
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
}

CRUDAll.propTypes = {
  dogs: PropTypes.array.isRequired,
  editDog: PropTypes.func.isRequired,
  deleteDog: PropTypes.func.isRequired,
};
