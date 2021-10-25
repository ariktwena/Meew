import React, { useState, useEffect } from "react";

export default function CRUDEdit(props) {
  const { dogToAddEdit, dogId, storeAddEditDog, cancelButton } = props;

  const emptyDog = {
    id: "",
    name: "",
    breed: "",
    image: "",
    birthdate: {
      year: "",
      day: "",
      month: "",
    },
    gender: "",
    owner: {
      name: "",
      address: "",
      phone: "",
    },
    walkers: [
      {
        name: "",
        address: "",
        phone: "",
      },
    ],
  };

  const [dog, setDog] = useState({ ...emptyDog });

  useEffect(() => {
    console.log(dogId);
    setDog({ ...dogToAddEdit });
    console.log(dog);
  }, [dogToAddEdit]);

  const handleChange = (event) => {
    //console.log(event.target.value);
    const target = event.target;
    console.log(target);
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log(
      "Value: " + target.type === "checkbox" ? target.checked : target.value
    );
    const name = target.name;
    console.log("Name: " + name);
    if (name === "day" || name === "month" || name === "year") {
      dog.birthdate[name] = parseInt(value);
      setDog({ ...dog });
    } else if (name === "ownerName") {
      dog.owner["name"] = value;
      setDog({ ...dog });
    } else if (name === "ownerAddress") {
      dog.owner["address"] = value;
      setDog({ ...dog });
    } else if (name === "ownerPhone") {
      dog.owner["phone"] = value;
      setDog({ ...dog });
    } else if (name === "walkerName") {
      dog.walkers[0]["name"] = value;
      setDog({ ...dog });
    } else if (name === "walkerAddress") {
      dog.walkers[0]["address"] = value;
      setDog({ ...dog });
    } else if (name === "walkerPhone") {
      dog.walkers[0]["phone"] = value;
      setDog({ ...dog });
    } else {
      dog[name] = value;
      setDog({ ...dog, [name]: value });
    }
    console.log(dog);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(dog);
    if (dog.gender === "") {
      document.getElementById("errorForm").innerHTML = "Please choose a gender";
      setTimeout(function () {
        document.getElementById("errorForm").innerHTML = "";
      }, 2500);
    } else if (
      dog.birthdate.day > 30 &&
      (dog.birthdate.month === 4 ||
        dog.birthdate.month === 6 ||
        dog.birthdate.month === 9 ||
        dog.birthdate.month === 11)
    ) {
      document.getElementById("day").value = 30;
      dog.birthdate.day = 30;
      document.getElementById("errorForm").innerHTML =
        "There are not that many days in the month. Day set to the 30th";
      setTimeout(function () {
        document.getElementById("errorForm").innerHTML = "";
      }, 2500);
    } else if (dog.birthdate.day > 29 && dog.birthdate.month === 2) {
      if (checkLeapYear(dog.birthdate.year)) {
        console.log("Leap Year");
        document.getElementById("day").value = 29;
        dog.birthdate.day = 29;
        document.getElementById("errorForm").innerHTML =
          "There are not that many days in the month. Day set to the 29th";
        setTimeout(function () {
          document.getElementById("errorForm").innerHTML = "";
        }, 2500);
      } else {
        console.log("Not Leap Year");
        document.getElementById("day").value = 28;
        dog.birthdate.day = 28;
        document.getElementById("errorForm").innerHTML =
          "There are not that many days in the month. Day set to the 28th";
        setTimeout(function () {
          document.getElementById("errorForm").innerHTML = "";
        }, 2500);
      }
    } else if (
      dog.birthdate.day > 28 &&
      dog.birthdate.month === 2 &&
      !checkLeapYear(dog.birthdate.year)
    ) {
      console.log("Not Leap Year");
      document.getElementById("day").value = 28;
      dog.birthdate.day = 28;
      document.getElementById("errorForm").innerHTML =
        "There are not that many days in the month. Day set to the 28th";
      setTimeout(function () {
        document.getElementById("errorForm").innerHTML = "";
      }, 2500);
    } else {
      storeAddEditDog(dog);
      cancelButton();
    }
  };

  const cancel = () => {
    cancelButton();
  };

  const checkLeapYear = (year) => {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  };

  return (
    <div>
      <form
        className="form-horizontal"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <label className="control-label col-sm-3">Id:</label>
          <div className="col-sm-9">
            <input
              className="form-control"
              readOnly
              name="id"
              id="id"
              defaultValue={dog.id}
            />
          </div>
        </div>
        <div className="form-group">
            <label className="control-label col-sm-3" htmlFor="name">
              Dog Name:
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                name="name"
                id="name"
                placeholder="Enter Dog Name"
                defaultValue={dog.name}
                required
              />
            </div>
          </div>
        {/* {dogId !== "" ? (
          <div className="form-group">
            <label className="control-label col-sm-3" htmlFor="name">
              Dog Name:
            </label>
            <div className="col-sm-9">
              <input
                readOnly
                className="form-control"
                name="name"
                id="name"
                placeholder="Enter Dog Name"
                defaultValue={dog.name}
                required
              />
            </div>
          </div>
        ) : (
          <div className="form-group">
            <label className="control-label col-sm-3" htmlFor="name">
              Dog Name:
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                name="name"
                id="name"
                placeholder="Enter Dog Name"
                defaultValue={dog.name}
                required
              />
            </div>
          </div>
        )} */}
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Dog Breed:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              name="breed"
              id="bredd"
              placeholder="Enter Breed"
              defaultValue={dog.breed}
              required
            />
          </div>
        </div>
        {dogId !== "" ? (
          <div className="form-group">
            <label className="control-label col-sm-3" htmlFor="name">
              Gender:
            </label>
            <div className="col-sm-9">
              <select
                className="form-control"
                name="gender"
                id="gender"
                required
              >
                {dog.gender === "F" ? (
                  <React.Fragment>
                    <option value="M">Male</option>
                    <option value="F" selected>
                      Female
                    </option>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <option value="M" selected>
                      Male
                    </option>
                    <option value="F">Female</option>
                  </React.Fragment>
                )}
              </select>
            </div>
          </div>
        ) : (
          <div className="form-group">
            <label className="control-label col-sm-3" htmlFor="name">
              Gender:
            </label>
            <div className="col-sm-9">
              <select
                className="form-control"
                name="gender"
                id="gender"
                required
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>
        )}
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Birthdate:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              type="number"
              name="day"
              id="day"
              min="1"
              max="31"
              placeholder="Select Day"
              defaultValue={dog.birthdate.day}
              required
            />
          </div>
          <div className="col-sm-9">
            <input
              className="form-control"
              type="number"
              name="month"
              id="month"
              min="1"
              max="12"
              placeholder="Select Month"
              defaultValue={dog.birthdate.month}
              required
            />
          </div>
          <div className="col-sm-9">
            <input
              className="form-control"
              type="number"
              name="year"
              id="year"
              min="1970"
              max="2021"
              placeholder="Select Year"
              defaultValue={dog.birthdate.year}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Dog Image:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              name="image"
              id="image"
              placeholder="Enter Image"
              defaultValue={dog.image}
              required
            />
          </div>
        </div>

        <hr />

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Owner Name:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              name="ownerName"
              id="ownerName"
              placeholder="Enter Name"
              defaultValue={dog.owner.name}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Address:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              name="ownerAddress"
              id="ownerAddress"
              placeholder="Enter Address"
              defaultValue={dog.owner.address}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Phone:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              name="ownerPhone"
              id="ownerPhone"
              placeholder="Enter Phone"
              defaultValue={dog.owner.phone}
              required
            />
          </div>
        </div>

        <hr />

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Walker Name:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              name="walkerName"
              id="walkerName"
              placeholder="Enter Name"
              defaultValue={dog.walkers[0].name}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Address:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              name="walkerAddress"
              id="walkerAddress"
              placeholder="Enter Address"
              defaultValue={dog.walkers[0].address}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Phone:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              name="walkerPhone"
              id="walkerPhone"
              placeholder="Enter Phone"
              defaultValue={dog.walkers[0].phone}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              {dogId !== "" ? "Save Changes" : "Save Dog"}
            </button>

            {dogId !== "" ? (
              <button
                style={{ marginLeft: 5 }}
                type="button"
                className="btn btn-dark"
                onClick={cancel}
              >
                Cancel
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
      <div className="" style={{ color: "red" }} id="errorForm"></div>
    </div>
  );
}
