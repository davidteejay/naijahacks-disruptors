import React from "react";
import Todo from "./components/TodoForm";
import Todos from "./components/TodoList";
import "./App.css";

function App() {
  return (
    <div>
      <div>Hello World</div>;
      <Todo />
      <Todos />
    </div>
  );
}

export default App;
