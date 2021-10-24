import React, { useState, useEffect } from "react";

const ParallelDTO = (props) => {
  const { facade } = props;

  const emptyArray = [];
  const [maps, setMaps] = useState([...emptyArray]);

  useEffect(() => {
    facade.getMapsWithDTO((data) => {
      console.log(data);
      setMaps([...data]);
    });
  }, []);

  return (
    <div>
      {/* {JSON.stringify(maps)} */}
      <br />
      <h3 className="text-center">Parallel Fetch With DTO</h3>
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Native Name</th>
            <th scope="col">Area</th>
            <th scope="col">Borders</th>
            <th scope="col">Capital</th>
            <th scope="col">Languages</th>
            <th scope="col">Population</th>
            <th scope="col">Timezones</th>
          </tr>
        </thead>
        <tbody>
          {maps.map((country, index) => (
            <tr key={index}>
              <td>{country.name}</td>
              <td>{country.nativeName}</td>
              <td>{country.area}</td>
              <td>
                {country.borders.length > 1
                  ? country.borders[0] +
                    " (+" +
                    (country.borders.length - 1) +
                    ")"
                  : country.borders[0]}
              </td>
              <td>{country.capital}</td>
              <td>{country.languages}</td>
              <td>{country.population}</td>
              <td>
                {country.timezones.length > 1
                  ? country.timezones[0] +
                    " (+" +
                    (country.timezones.length - 1) +
                    ")"
                  : country.timezones[0]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParallelDTO;
