import React, { useState } from "react";

const Country = (props) => {
  const { facade } = props;

  const defaultCountry = {
    name: "",
    nativeName: "",
    area: "",
    borders: [],
    capital: "",
    languages: "",
    population: "",
    timezones: [],
  };
  const [result, setResult] = useState({ ...defaultCountry });
  const [countryToFind, setCountryToFind] = useState("");

  const handleChangeCountry = (event) => {
    // console.log(event)
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    // console.log(value)
    setCountryToFind(value);
  };

  const handleSubmitCountry = (event) => {
    event.preventDefault();
    facade.getCountry(countryToFind, (data) => {
      console.log(data);
      setResult({ ...data });
    });
  };

  return (
    <div>
      <br />
      <h3 className="text-center">Find Country DTO</h3>
      <br />

      <form onSubmit={handleSubmitCountry} onChange={handleChangeCountry}>
        <label>
          {/* Find book by id */}
          {/* <br></br> */}
          <input
            id="id"
            type="text"
            name="id"
            defaultValue={countryToFind}
            placeholder="Write the country code"
          />
        </label>

        <input type="submit" value="Find Country" />
      </form>

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
          <tr>
            <td>{result.name}</td>
            <td>{result.nativeName}</td>
            <td>{result.area}</td>
            <td>
              {result.borders.length > 1
                ? result.borders[0] + " (+" + (result.borders.length - 1) + ")"
                : result.borders[0]}
            </td>
            <td>{result.capital}</td>
            <td>{result.languages}</td>
            <td>{result.population}</td>
            <td>
              {result.timezones.length > 1
                ? result.timezones[0] +
                  " (+" +
                  (result.timezones.length - 1) +
                  ")"
                : result.timezones[0]}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Country;
