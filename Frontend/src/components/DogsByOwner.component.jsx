import React, { useState, useEffect } from "react";

export default function DogsByOwner(props) {
  const { facade } = props;
  const defaultArray = [];
  const defaultID = { id: "" };
  const [list, setList] = useState([...defaultArray]);
  const [ownerId, setOwnerId] = useState({ ...defaultID });
  const [errorMsg, setErrorMsg] = useState(false);


  const handleChange = (event) => {
    //console.log(event.target.value);
    const target = event.target;
    //console.log(target);
    const value = target.type === "checkbox" ? target.checked : target.value;
    //console.log("Value: " + target.type === "checkbox" ? target.checked : target.value);
    const name = target.name;
    //console.log("Name: " + name);
    // library[name] = value;
    ownerId[name] = value;
    setOwnerId({ ...ownerId, [name]: value });
    console.log(ownerId);
  };

  const handleSubmit = (event) => {
    
    event.preventDefault();
    console.log(ownerId.id);
    facade.getAllOwnersDogs(ownerId.id, (dogList) => {
      console.log(dogList)
      setList([...dogList])
      if(!dogList.length){
        setErrorMsg(true);
        setTimeout(function () {
            setErrorMsg(false);
        }, 2500);
      } 
    });
    
  };

  return (
    <div>
      {console.log(list)}
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <h1 className="text-center">All Owners Dogs</h1>
          {errorMsg === false ? "" : <p className="text-center" style={{color: "red"}}>No maches found</p>}
          <form
            className="form-horizontal"
            onSubmit={handleSubmit}
            onChange={handleChange}
          >
            <div className="form-group">
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="number"
                  name="id"
                  id="id"
                  placeholder="Write Owner Id"
                  defaultValue={ownerId.id}
                  required
                />
              </div>
            </div>
            <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Find Dogs
            </button>
          </div>
        </div>
          </form>
        </div>
        <div className="col-md-1"></div>
      </div>

      <br />
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Breed</th>
                <th scope="col">Image</th>
                <th scope="col">Gender</th>
                <th scope="col">Birthdate</th>
              </tr>
            </thead>
            <tbody>
              {list.map((dog) => (
                <tr
                  style={{ cursor: "pointer" }}
                  key={dog.id}
                  id={dog.id}
                >
                  <th scope="row">{dog.id}</th>
                  <td>{dog.name}</td>
                  <td>{dog.breed}</td>
                  <td><img src={dog.image} alt="doog" width="50" height="50"></img></td>
                  {dog.gander === "M" ? <td>Male</td> : <td>Female</td>}
                  <td>{dog.birthdate.day}-{dog.birthdate.month}-{dog.birthdate.year}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
