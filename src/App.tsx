import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.scss";
import DraggableIssueBox from "./components/DraggableIssueBox";
import TasksContainer from "./components/TasksContainer";

type issueArr =
  | {
      type: string;
      title: string;
      text: string;
      className: string;
    }[];

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [issueArr, setIssueArr] = useState([
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
  ]);

  function getWindowWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", getWindowWidth);

    return () => window.removeEventListener("resize", getWindowWidth);
  }, []);

  function dragEndHandler(result: any) {
    console.log("result drag:", result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedList: issueArr = reorder(
      issueArr,
      result.source.index,
      result.destination.index
    );

    setIssueArr(reorderedList);
  }

  function reorder(list: issueArr, startIdx: number, endIdx: number) {
    const reorderedList = Array.from(list);
    const [removed] = reorderedList.splice(startIdx, 1);

    reorderedList.splice(endIdx, 0, removed);

    return reorderedList;
  }

  return (
    <div className="App min-h-screen bg-slate-900">
      <header className="w-screen text-slate-100 h-12 bg-slate-700 shadow-md">
        {width}
      </header>
      <div className="flex flex-row flex-wrap xs:child:my-2 not-xs:child:mt-5 not-xs:child:mr-2 last-child:mr-0">
        <TasksContainer
          className="m-1"
          containerName="to do"
          dragEndHandler={dragEndHandler}
        >
          {issueArr.map((issue, idx) => (
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
