import React, { useState } from "react";
import { useDispatch } from "react-redux";

function Todo() {
  const dispatch = useDispatch();
  let [title, setTitle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      title: title
    };

    dispatch({
      type: "CREATE_NEW_DATA",
      data
    });
    console.log("DATA SAVED");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={e => setTitle(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Todo;
