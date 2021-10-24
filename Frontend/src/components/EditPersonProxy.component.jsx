import React, { useState, useEffect } from "react";

export default function EditPersonProxy(props) {
  const { facade } = props;

  const defaulPerson = {
    id: 0,
    name: "",
    street: "",
    city: "",
    zip: "",
  };
  const [person, setPerson] = useState({ ...defaulPerson });
  const [msg, setMsg] = useState(false);
  const [id, setId] = useState(0);

  const handleChangeID = (event) => {
    // console.log(event)
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    // console.log(value)
    setId(value);
  };

  const handleSubmitID = (event) => {
    event.preventDefault();
    facade.getPersonProxy(id, (data) => {
      console.log(data);
      setPerson({ ...data });
    });
  };

  /* Add the required changes to use Reacts "Controlled Component Pattern" 
     to handle inputs related to a person */
  const handleChange = (event) => {
    //console.log(event.target.value);
    const target = event.target;
    //console.log(target);
    const value = target.type === "checkbox" ? target.checked : target.value;
    //console.log("Value: " + target.type === "checkbox" ? target.checked : target.value);
    const name = target.name;
    //console.log("Name: " + name);
    person[name] = value;
    setPerson({ ...person, [name]: value });
    //console.log(person);
  };

  //resetter setMember hvis props.defaultMember har ændret sig
  // useEffect(() => setPerson({ ...props.newPerson }), [props.newPerson]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(person);
    facade.editPersonProxy(id, person, (data) => {
      console.log(data);
    });
    setMsg(true);
    setPerson({ ...defaulPerson });
    document.getElementById("name").value = "";
    document.getElementById("street").value = "";
    document.getElementById("zip").value = "";
    document.getElementById("city").value = "";
    setTimeout(function () {
      setMsg(false);
    }, 2500);
  };

  return (
    <div>
      <br />
      <h3 className="text-center">Edit Person With Proxy</h3>
      <br />
      {person.id !== 0 ? (
        ""
      ) : (
        <div className="text-center">
        <form onSubmit={handleSubmitID} onChange={handleChangeID}>
          <label>
            {/* Find book by id */}
            {/* <br></br> */}
            <input id="id" type="number" name="id" defaultValue={id} />
          </label>

          <input type="submit" value="Find Person" />
        </form>
        </div>
      )}

      {person.id === 0 ? (
        ""
      ) : (
        <form
          className="form-horizontal"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <div className="form-group">
            <label className="control-label col-sm-3" htmlFor="name">
              Name:
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                name="name"
                id="name"
                placeholder="Enter Name"
                defaultValue={person.name}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" htmlFor="street">
              Street:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                name="street"
                id="street"
                placeholder="Enter Street"
                defaultValue={person.street}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" htmlFor="zip">
              Zip:
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                name="zip"
                id="zip"
                placeholder="Enter Zip"
                defaultValue={person.zip}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" htmlFor="city">
              City:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                name="city"
                id="city"
                placeholder="Enter City"
                defaultValue={person.city}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-9">
              <button type="submit" className="btn btn-primary">
                Edit Person
              </button>
            </div>
          </div>
        </form>
      )}
      {msg === true ? (
        <p className="alert alert-success">Person updated!</p>
      ) : (
        ""
      )}
    </div>
  );
}
