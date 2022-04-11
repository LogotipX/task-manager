import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import TasksContainer from "./components/TasksContainer";

function App() {
  return (
    <div className="App min-h-screen bg-slate-900">
      <header className="w-screen h-12 bg-slate-700 shadow-md"></header>
      <TasksContainer />
    </div>
  );
}

export default App;
