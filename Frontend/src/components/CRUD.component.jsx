import React, { useState, useEffect } from "react";
import CRUDAll from "./CRUDAll.component";
import CRUDEdit from "./CRUDEdit.component";

export default function CRUD(props) {
  const { facade } = props;

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
  const [dogToAddEdit, setDogToAddEdit] = useState({ ...emptyDog });
  const [dogs, setDogs] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  const defaultError = "";
  const [errorMsg, setErrorMsg] = useState(defaultError);

  useEffect(() => {
    facade.getAllDogs((allDogs) => {
      console.log(allDogs);
      setDogs([...allDogs]);
    });
  }, []);

  useEffect(() => {
    facade.getAllDogs((allDogs) => {
      console.log(allDogs);
      setDogs([...allDogs]);
    });
  }, [fetchData]);

  const storeAddEditDog = (dog) => {
    //Call this from the AddEditPerson control with the person to Add or Edit and Add/Edit via the apiFacade
    console.log(dog);
    facade.addEditDog(dog, (addedEditDog) => {
      console.log(addedEditDog);
      if (addedEditDog.code > 0) {
        document.getElementById(
          "errorMsg"
        ).innerHTML = `Code: ${addedEditDog.code}, Message: ${addedEditDog.message}`;
        setTimeout(function () {
          document.getElementById("errorMsg").innerHTML = "";
        }, 2500);
      } else {
        // setFetchData(!fetchData);
        cancelButton();
        facade.getAllDogs((allDogs) => {
          console.log(allDogs);
          setDogs([...allDogs]);
        });
      }
    });
  };

  const deleteDog = (id) => {
    //Call this from the AllPerson control with the id for the person to delete
    facade.deleteDog(id, (data) => {
      document.getElementById("errorMsg").style.display = "none";
      //   console.log(data);
      setFetchData(!fetchData);
    });
  };

  const editDog = (id) => {
    // setBookToAddEdit({ ...emptyBook });
    const theDog = dogs.find((d) => d.id === id);
    setDogToAddEdit({ ...theDog });
    document.getElementById("id").value = theDog.id;
    document.getElementById("name").value = theDog.name;
    document.getElementById("bredd").value = theDog.breed;
    document.getElementById("gender").value = theDog.gender;
    document.getElementById("day").value = theDog.birthdate.day;
    document.getElementById("month").value = theDog.birthdate.month;
    document.getElementById("year").value = theDog.birthdate.year;
    document.getElementById("image").value = theDog.image;
    document.getElementById("ownerName").value = theDog.owner.name;
    document.getElementById("ownerAddress").value = theDog.owner.address;
    document.getElementById("ownerPhone").value = theDog.owner.phone;
    document.getElementById("walkerName").value = theDog.walkers[0].name;
    document.getElementById("walkerAddress").value = theDog.walkers[0].address;
    document.getElementById("walkerPhone").value = theDog.walkers[0].phone;

    setFetchData(!fetchData);

  };

  //   const getBook = (book) => {
  //     //Call thisfrom the AllPerson control with the  person to edit
  //     //Set the state variable personToAddEdit with this person (a clone) to make the new value flow down via props
  //   };

  const cancelButton = () => {
    setDogToAddEdit({ ...emptyDog });
    setFetchData(!fetchData);
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("bredd").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("day").value = "";
    document.getElementById("month").value = "";
    document.getElementById("year").value = "";
    document.getElementById("image").value = "";
    document.getElementById("ownerName").value = "";
    document.getElementById("ownerAddress").value = "";
    document.getElementById("ownerPhone").value = "";
    document.getElementById("walkerName").value = "";
    document.getElementById("walkerAddress").value = "";
    document.getElementById("walkerPhone").value = "";
  };

  return (
    // <div className="container">
    <div>
      {/* {JSON.stringify(personToAddEdit)} */}
      {/* {console.log(bookToAddEdit)} */}
      <h3 className="text-center">CRUD</h3>
      <div className="row">
        {/* <h3>CRUD Demo </h3> */}
        <div className="col-md-7">
          <h3 className="text-center">All Dogs</h3>
          <CRUDAll
            dogs={dogs}
            editDog={editDog}
            deleteDog={deleteDog}
            // getBook={getBook}
          />
          <p style={{ color: "red" }} id="errorMsg"></p>
        </div>
        <div className="col-md-5">
          <h3 className="text-center">
            {dogToAddEdit.id === "" ? "Add Dog" : "Edit Dog"}
          </h3>
          <CRUDEdit
            dogToAddEdit={dogToAddEdit}
            //  Next two lines, are if you decide to use the pattern introduced in the day-2 exercises
            storeAddEditDog={storeAddEditDog}
            dogId={dogToAddEdit.id}
            cancelButton={cancelButton}
            editDog={editDog}
          />
        </div>
      </div>
    </div>
  );
}
