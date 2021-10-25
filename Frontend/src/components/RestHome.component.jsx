import React from "react";

const RestHome = () => {
  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <h3 className="text-center">Rest</h3>
            <br />
            <p>
              List of Walkers: Få et overblik over alle walkers
            </p>
            <p>Dogs by Owner: Find de hunde som en ejer har via ejer-id</p>
            <p>Walker by Dog: Find de Walker som en hund har</p>
            <p>CRUD: Opret, ændre eller slet en hund. Owner og Walker har unikke tlf. nr. Når man opretter en ny, hvis man ændre deres nr :)</p>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
};

export default RestHome;
