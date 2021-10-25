import React from "react";

const ProxyHome = () => {
  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <h3 className="text-center">Proxys</h3>
            <br />
            <p>Parallel: Fetch data from 5 URL's simultaneously without DTO</p>
            <p>Find Country: Fetch a country through countrycode without DTO</p>
            <p>Jokes: Fetch data from to different Joke Api's with different output</p>
            <p>
              All Persons: Fetch all data from remote proxy, and delete Persons
            </p>
            <p>Add Person: Add new Person through proxy connection</p>
            <p>Edit Person: Edit existing Person through proxy connection</p>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
};

export default ProxyHome;
