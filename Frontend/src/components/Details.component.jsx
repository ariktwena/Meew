import React from "react";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  useParams,
  // useRouteMatch,
  // NavLink,
} from "react-router-dom";

export default function Details(props) {
  const { findBook } = props;
  let { id } = useParams();
  
//   const books = props.books;
//   const book = books.find((b) => b.id === parseInt(id));

const book = findBook(parseInt(id));

  return (
    <div>
      {/* {console.log(props)}
      {console.log(props.books)}
      {console.log(id)}
      {console.log(book)} */}
      <h2>{book.title}</h2>
      <p>info: {book.info}</p>
      <p>Id: {book.id}</p>
    </div>
  );
}
