import React from "react";
import { useSelector } from "react-redux";

const Todos = () => {
  const todoLists = useSelector(state => ({
    data: state
  }));

  return (
    <div>
      {todoLists.data.items.map((todos, index) => (
        <ul key={index}>
          {/* <li>{todos.id}</li> */}
          <li>{todos.title}</li>
        </ul>
      ))}
    </div>
  );
};

export default Todos;
