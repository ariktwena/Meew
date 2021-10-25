import React, { useState, useEffect } from "react";

export default function EditPersonRest(props) {
  const { facade } = props;

  const defaulPerson = {
    id: 0,
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
    facade.getPersonRest(id, (data) => {
      // console.log(data);
      // console.log(defaulPerson);
      defaulPerson.id = data.id;
      defaulPerson.name = data.name;
      // console.log(defaulPerson);
      setPerson({ ...defaulPerson });
      defaultJob.title = data.job.title;
      // console.log(defaultJob);
      setJob({ ...defaultJob });
      defaultNickName.nickName = data.nickName.nickName;
      // console.log(defaultNickName);
      setNickName({ ...defaultNickName });
      defaultHobby.name = data.hobbies[0].name;
      // console.log(defaultHobby);
      setHobby({ ...defaultHobby });
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
    // person[name] = value;
    // setPerson({ ...person, [name]: value });
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

    //console.log(person);
  };

  //resetter setMember hvis props.defaultMember har ændret sig
  // useEffect(() => setPerson({ ...props.newPerson }), [props.newPerson]);

  const handleSubmit = (event) => {
    event.preventDefault();

    person.job = { ...job };
    person.nickName = { ...nickName };
    person.hobbies.push(hobby);

    console.log(person);
    facade.editPersonRest(id, person, (data) => {
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
      <h3 className="text-center">Edit Person With Rest</h3>
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
              Job:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                name="title"
                id="job"
                placeholder="Enter Job Title"
                defaultValue={job.title}
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
                defaultValue={nickName.nickName}
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
                defaultValue={hobby.name}
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
