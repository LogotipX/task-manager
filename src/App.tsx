import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.scss";
import TasksContainer from "./components/TasksContainer";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  function getWindowWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", getWindowWidth);

    return () => window.removeEventListener("resize", getWindowWidth);
  }, []);

  return (
    <div className="App min-h-screen bg-slate-900">
      <header className="w-screen text-slate-100 h-12 bg-slate-700 shadow-md">
        {width}
      </header>
      <div className="flex flex-row flex-wrap xs:child:my-2 not-xs:child:mt-5 not-xs:child:mr-2 last-child:mr-0">
        <TasksContainer className="m-1" containerName="to do" />
        <TasksContainer className="m-1" containerName="to do" />
      </div>
    </div>
  );
}

export default App;
