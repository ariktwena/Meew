import React, { useState, useEffect } from "react";

export default function Walker(props) {
  const { facade } = props;
  const defaultArray = [];

  const [walkers, setWalkers] = useState([...defaultArray]);

  useEffect(() => {
    facade.getAllWalkers((walkerData) => {
      console.log(walkerData);
      setWalkers([...walkerData]);
    });
  }, []);

  return (
    // <Router>
    <div>
      {/* {console.log(props.isLoggedIn)} */}
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <h1 className="text-center">All Walkers</h1>
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
              {walkers.map((walker) => (
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
