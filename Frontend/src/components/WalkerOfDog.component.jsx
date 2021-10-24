import React, { useState, useEffect } from "react";

export default function WalkerByDog(props) {
  const { facade } = props;
  const defaultArray = [];
  const defaultID = { id: "" };
  const [list, setList] = useState([...defaultArray]);
  const [walkerId, setWalkerId] = useState({ ...defaultID });
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
    walkerId[name] = value;
    setWalkerId({ ...walkerId, [name]: value });
    console.log(walkerId);
  };

  const handleSubmit = (event) => {
    
    event.preventDefault();
    console.log(walkerId.id);
    facade.getAllWalkersByDogId(walkerId.id, (walkerList) => {
      console.log(walkerList)
      setList([...walkerList])
      if(!walkerList.length){
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
          <h1 className="text-center">All Walkers by Dog</h1>
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
                  placeholder="Write Dog Id"
                  defaultValue={walkerId.id}
                  required
                />
              </div>
            </div>
            <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Find Walkers
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
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {list.map((walker) => (
                <tr
                  style={{ cursor: "pointer" }}
                  key={walker.id}
                  id={walker.id}
                >
                  <th scope="row">{walker.id}</th>
                  <td>{walker.name}</td>
                  <td>{walker.address}</td>
                  <td>{walker.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
