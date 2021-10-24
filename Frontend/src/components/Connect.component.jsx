import React, { useState, useEffect } from "react";

export default function Connect(props) {
  const { facade } = props;

  const defaultArray = [];
  const connector = {
    dogId: "",
    ownerId: "",
  };
  const [dogs, setDogs] = useState([...defaultArray]);
  const [owners, setOwners] = useState([...defaultArray]);
  const [theConnecter, setTheConnector] = useState({ ...connector });

  useEffect(() => {
    facade.getAllDogs((dogList) => {
      console.log(dogList);
      setDogs([...dogList]);
    });
    facade.getAllOwners((ownerList) => {
      console.log(ownerList);
      setOwners([...ownerList]);
    });
  }, []);

  const handleChange = (event) => {
    //console.log(event.target.value);
    const target = event.target;
    //console.log(target);
    const value = target.type === "checkbox" ? target.checked : target.value;
    //console.log("Value: " + target.type === "checkbox" ? target.checked : target.value);
    const name = target.name;
    //console.log("Name: " + name);

    if (name === "dogId") {
      theConnecter["dogId"] = value;
      setTheConnector({ ...theConnecter });
    } else {
      theConnecter["ownerId"] = value;
      setTheConnector({ ...theConnecter });
    }
    console.log(theConnecter);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(theConnecter);
    if (theConnecter.dogId === "" || theConnecter.ownerId === "") {
      document.getElementById("errorForm").innerHTML =
        "Please choose a dog and an owner";
      setTimeout(function () {
        document.getElementById("errorForm").innerHTML = "";
      }, 2500);
    } else {
      facade.connectDogAndOwner(
        theConnecter.dogId,
        theConnecter.ownerId,
        (data) => {
          console.log(data);
          document.getElementById("success").innerHTML =
            "Connection gennemført :)";
          setTimeout(function () {
            document.getElementById("success").innerHTML = "";
          }, 2500);
          setTheConnector({ ...connector });
        }
      );
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-6">
            <h3 className="text-center">Connect Dog with Owner</h3>
            <br />
            <form
              className="form-horizontal"
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <div className="form-group">
                <label className="control-label col-sm-3" htmlFor="name">
                  Dog:
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-control"
                    name="dogId"
                    id="dogId"
                    required
                  >
                    <option>Choose Dog</option>

                    {dogs.map((dog) => (
                      <option value={dog.id} key={dog.id}>
                        {dog.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-3" htmlFor="name">
                  Owner:
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-control"
                    name="ownerId"
                    id="ownerId"
                    required
                  >
                    <option>Choose Owner</option>

                    {owners.map((owner) => (
                      <option value={owner.id} key={owner.id}>
                        {owner.name} {owner.phone}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-9">
                  <button type="submit" className="btn btn-primary">
                    Connect Dog with Owner
                  </button>
                </div>
              </div>
            </form>
            <div className="" style={{ color: "red" }} id="errorForm"></div>
            <div className="" style={{ color: "green" }} id="success"></div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
}
