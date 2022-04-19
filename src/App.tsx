import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.scss";
import DraggableIssueBox from "./components/DraggableIssueBox";
import TasksContainer from "./components/TasksContainer";

import issueArrFromApi from "./api/api";

type issueArr = {
  type: string;
  title: string;
  text: string;
  className: string;
}[];

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  let tasksContainerRefHeight: React.RefObject<HTMLInputElement> =
    React.createRef();
  const [tasksContainerHeight, setTasksContainerHeight] = useState(0);

  const [issueArr, setIssueArr] = useState<issueArr>([]);

  function getWindowWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", getWindowWidth);

    setIssueArr(issueArrFromApi);

    if (tasksContainerRefHeight.current?.scrollHeight) {
      console.log(tasksContainerHeight);

      setTasksContainerHeight(tasksContainerRefHeight.current?.scrollHeight);
    }

    return () => window.removeEventListener("resize", getWindowWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueArr]);

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
      <div
        className={`min-h-fit container-for-TasksContainers not-xs:px-1.5 text-slate-50 border-b-2 flex flex-row flex-wrap xs:child:my-2 not-xs:child:mt-5 not-xs:child:mr-2 last-child:mr-0`}
      >
        <div
          className="task-container min-h-full"
          style={
            // tasksContainerHeight
            // ?
            { height: `${tasksContainerHeight}px` }
            // : { height: "calc(100%+36px)" }
          }
          ref={tasksContainerRefHeight}
        >
          <TasksContainer containerName="to do" dragEndHandler={dragEndHandler}>
            {issueArr.length
              ? issueArr.map((issue, idx) => (
                  <DraggableIssueBox
                    idx={idx}
                    issue={{ ...issue }}
                    key={`${idx}-${issue.type}-${issue.title}`}
                  />
                ))
              : null}
          </TasksContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
