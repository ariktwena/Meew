import React, { useState, useEffect } from "react";

export default function AddPersonRest(props) {
  const { facade } = props;

  const defaulPerson = {
    name: "",
    job: {},
    nickName: {},
    hobbies: [],
  };
  const defaultJob = {
    title: "",
  };
  const defaultNickName = {
    nickName: "",
  };
  const defaultHobby = {
    name: "",
  };
  const [person, setPerson] = useState({ ...defaulPerson });
  const [job, setJob] = useState({ ...defaultJob });
  const [nickName, setNickName] = useState({ ...defaultNickName });
  const [hobby, setHobby] = useState({ ...defaultHobby });
  const [msg, setMsg] = useState(false);

  /* Add the required changes to use Reacts "Controlled Component Pattern" 
     to handle inputs related to a person */
  const handleChange = (event) => {
    console.log(event.target.value);
    const target = event.target;
    console.log(target);
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log(
      "Value: " + target.type === "checkbox" ? target.checked : target.value
    );
    const name = target.name;
    // console.log("Name: " + name);
    if (event.target.id === "name") {
      person[name] = value;
      setPerson({ ...person, [name]: value });
    } else if (event.target.id === "job") {
      job[name] = value;
      setJob({ ...job, [name]: value });
    } else if (event.target.id === "nickName") {
      nickName[name] = value;
      setNickName({ ...nickName, [name]: value });
    } else if (event.target.id === "hobby") {
      hobby[name] = value;
      setHobby({ ...hobby, [name]: value });
    }

    // setPerson({ ...person, [name]: value });
    // console.log(person);
    // console.log(job);
    // console.log(nickName);
    // console.log(hobby);
  };

  //resetter setMember hvis props.defaultMember har ændret sig
  // useEffect(() => setPerson({ ...props.newPerson }), [props.newPerson]);

  const handleSubmit = (event) => {
    event.preventDefault();

    person.job = { ...job };
    person.nickName = { ...nickName };
    person.hobbies.push(hobby);

    console.log(person);
    facade.addPersonRest(person, (data) => {
      console.log(data);
    });
    setMsg(true);
    setPerson({ ...defaulPerson });
    setJob({ ...defaultJob });
    setNickName({ ...defaultNickName });
    setHobby({ ...defaultHobby });
    document.getElementById("name").value = "";
    document.getElementById("job").value = "";
    document.getElementById("nickName").value = "";
    document.getElementById("hobby").value = "";
    setTimeout(function () {
      setMsg(false);
    }, 2500);
  };

  return (
    <div>
      <br />
      <h3 className="text-center">Add Person With Rest</h3>
      <br />
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
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="street">
            Job:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              name="title"
              id="job"
              placeholder="Enter Job Title"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="zip">
            Nickname:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              name="nickName"
              id="nickName"
              placeholder="Enter Nickname"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="city">
            Hobby:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              name="name"
              id="hobby"
              placeholder="Enter Hobby"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Add Person
            </button>
          </div>
        </div>
      </form>
      {msg === true ? (
        <p className="alert alert-success">Person created!</p>
      ) : (
        ""
      )}
    </div>
  );
}
