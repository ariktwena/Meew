import React, { useState, useEffect } from "react";

const Jokes = (props) => {
  const { facade } = props;

  const emptyArray = [];
  const [jokes, setJokes] = useState([...emptyArray]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    facade.getJokesProxy((data) => {
      console.log(data);
      setJokes([...data]);
    });
  }, []);

  useEffect(() => {
    facade.getJokesProxy((data) => {
      console.log(data);
      setJokes([...data]);
    });
  }, [count]);

  const updateJokes = () => {
    setCount(count + 1);
  };

  return (
    <div>
      {/* {JSON.stringify(maps)} */}
      <br />
      <h3 className="text-center">Fetch Jokes With Proxy</h3>
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">URL</th>
            <th scope="col">Joke</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{joke.url}</td>
              <td>{joke.joke}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button className="btn btn-primary" onClick={updateJokes}>
          Reload
        </button>
      </div>
    </div>
  );
};

export default Jokes;
