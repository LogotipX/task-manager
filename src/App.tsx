import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.scss";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import DraggableIssueBox from "./components/DraggableIssueBox";
import TasksContainer from "./components/TasksContainer";
import getIssues from "./api/api";

type tasksContainerArr = {
  taskContainerName: string;
  issues: {
    type: string;
    title: string;
    text: string;
  }[];
}[];

type issueArr = {
  type: string;
  title: string;
  text: string;
}[];

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  let tasksContainerRefHeight: React.RefObject<HTMLInputElement> =
    React.createRef();
  const [tasksContainerHeight, setTasksContainerHeight] = useState(0);

  const [issueArr, setIssueArr] = useState<issueArr>([]);
  const [tasksContainerArr, setTasksContainerArr] = useState<tasksContainerArr>(
    []
  );

  function getWindowWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", getWindowWidth);
    getIssues.then((res: tasksContainerArr) => {
      console.log("res", res);
      setTasksContainerArr(res);
    });

    return () => window.removeEventListener("resize", getWindowWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let refHeight = tasksContainerRefHeight.current?.scrollHeight;
    console.log("tasksContainerHeight:", tasksContainerHeight);
    console.log("refHeight:", refHeight);
    // if (refHeight && tasksContainerHeight < refHeight) {
    if (refHeight) {
      console.log(tasksContainerHeight);
      console.log("set to", refHeight);
      setTasksContainerHeight(refHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksContainerArr]);

  function dragEndHandler(result: DropResult): void {
    console.log("result drag:", result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    let reorderedTasksContainer = tasksContainerArr.slice(
      0,
      tasksContainerArr.length
    );
    let idxFrom: number = Number(result.source.droppableId);
    let idxTo: number = Number(result.destination.droppableId);
    console.log("container idx", idxFrom);

    if (idxFrom === idxTo) {
      const reorderedList: issueArr = reorderLocalTasks(
        reorderedTasksContainer[idxFrom].issues,
        result.source.index,
        result.destination.index
      );

      reorderedTasksContainer[idxFrom].issues = reorderedList.slice(
        0,
        reorderedList.length
      );

      setIssueArr(reorderedList);
      setTasksContainerArr(reorderedTasksContainer);
    } else {
      const reorderedList: tasksContainerArr = reorderGlobalTasks(
        reorderedTasksContainer,
        result.source.index,
        result.destination.index,
        idxFrom,
        idxTo
      );

      setTasksContainerArr(reorderedList);
    }
  }

  function reorderLocalTasks(
    list: issueArr,
    dragElIdxFrom: number,
    dragElIdxTo: number,
    containerFrom?: number,
    containerTo?: number
  ) {
    const reorderedList = Array.from(list);
    const [removed] = reorderedList.splice(dragElIdxFrom, 1);

    reorderedList.splice(dragElIdxTo, 0, removed);

    return reorderedList;
  }

  function reorderGlobalTasks(
    list: tasksContainerArr,
    fromDragElIdx: number,
    toDragElIdx: number,
    fromContainer: number,
    toContainer: number
  ) {
    const reorderedList = Array.from(list);
    const [removed] = reorderedList[fromContainer].issues.splice(
      fromDragElIdx,
      1
    );
    reorderedList[toContainer].issues.splice(toDragElIdx, 0, removed);

    return reorderedList;
  }

  return (
    <div className="App min-h-screen bg-slate-900">
      <header className="w-full text-slate-100 h-12 bg-slate-700 shadow-md">
        {width}
      </header>
      <div
        className={`min-h-fit container-for-TasksContainers not-xs:px-1.5 text-slate-50 border-b-2 flex flex-row flex-wrap xs:child:my-2 not-xs:child:mt-5 not-xs:child:mr-2 last-child:mr-0`}
      >
        <DragDropContext onDragEnd={dragEndHandler}>
          {tasksContainerArr.length
            ? tasksContainerArr.map(
                ({ taskContainerName, issues }, droppableIdx) => (
                  <div
                    className="task-container min-h-full"
                    style={{ height: `${tasksContainerHeight}px` }}
                    ref={tasksContainerRefHeight}
                    key={`${taskContainerName}-${droppableIdx}`}
                  >
                    <TasksContainer
                      containerName={taskContainerName}
                      droppableId={droppableIdx}
                      dragEndHandler={dragEndHandler}
                    >
                      {issues.length
                        ? issues.map((issue, idx) => (
                            <DraggableIssueBox
                              draggableId={`${droppableIdx}-${idx}`}
                              idx={idx}
                              issue={{ ...issue }}
                              key={`${idx}-${issue.type}-${issue.title}`}
                            />
                          ))
                        : null}
                    </TasksContainer>
                  </div>
                )
              )
            : null}
          {/* <TasksContainer containerName="to do" dragEndHandler={dragEndHandler}>
            {issueArr.length
              ? issueArr.map((issue, idx) => (
                <DraggableIssueBox
                idx={idx}
                issue={{ ...issue }}
                key={`${idx}-${issue.type}-${issue.title}`}
                />
                ))
                : null}
              </TasksContainer> */}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
