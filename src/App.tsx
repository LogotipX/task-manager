import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.scss";
import DraggableIssueBox from "./components/DraggableIssueBox";
import IssueBox from "./components/IssueBox";
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

  const IssueArr = [
    {
      type: "Task",
      title: "IssueBox1",
      text: "Refactor IssueBox component: need add functional and interpase",
      // priority: "some priority",
      className: "my-2",
    },
    {
      type: "Task",
      title: "IssueBox2",
      text: "Refactor IssueBox component: need add functional and interpase",
      // priority: "some priority",
      className: "my-2",
    },
    {
      type: "Task",
      title: "IssueBox3",
      text: "Refactor IssueBox component: need add functional and interpase",
      // priority: "some priority",
      className: "my-2",
    },
  ];

  return (
    <div className="App min-h-screen bg-slate-900">
      <header className="w-screen text-slate-100 h-12 bg-slate-700 shadow-md">
        {width}
      </header>
      <div className="flex flex-row flex-wrap xs:child:my-2 not-xs:child:mt-5 not-xs:child:mr-2 last-child:mr-0">
        <TasksContainer className="m-1" containerName="to do">
          {IssueArr.map((issue, idx) => (
            <DraggableIssueBox
              idx={idx}
              issue={{ ...issue }}
              key={`${idx}-${issue.type}-${issue.title}`}
            />
          ))}
        </TasksContainer>
      </div>
    </div>
  );
}

export default App;
