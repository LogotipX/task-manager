import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.scss";

import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
  OnBeforeDragStartResponder,
} from "react-beautiful-dnd";

import DraggableIssueBox from "./components/DraggableIssueBox";
import TasksContainer from "./components/TasksContainer";
import getIssues from "./api/api";

type containerForContainers = {}[];

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
  const [isDragContainer, setIsDragContainer] = useState(false);

  let tasksContainerRefHeight: React.RefObject<HTMLInputElement> =
    React.createRef();

  const [tasksContainerArr, setTasksContainerArr] = useState<tasksContainerArr>(
    []
  );

  function getWindowWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", getWindowWidth);
    getIssues.then((res: tasksContainerArr) => {
      setTasksContainerArr(res);
    });

    return () => window.removeEventListener("resize", getWindowWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function tasksDragEndHandler(result: DropResult): void {
    console.log("tasksDragEndHandler");
    // dropped outside the list
    console.log("dropResult", result);
    if (!result.destination) {
      return;
    }

    let reorderedTasksContainer = tasksContainerArr.slice(
      0,
      tasksContainerArr.length
    );
    const idxFrom: number = Number(result.source.droppableId);
    const idxTo: number = Number(result.destination.droppableId);

    if (result.destination.droppableId.indexOf("containersDropzone") > -1) {
      const idxFrom: number = Number(result.source.index);
      const idxTo: number = Number(result.destination.index);
      // reorderContainers(reorderedTasksContainer, idxFrom, idxTo);
      const reorderedContainers: tasksContainerArr = reorderContainers(
        reorderedTasksContainer,
        idxFrom,
        idxTo
      );
      setTasksContainerArr(reorderedContainers);
      return;
    }

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

  function reorderContainers(
    list: tasksContainerArr,
    fromDragElIdx: number,
    toDragElIdx: number
  ) {
    console.log("source", fromDragElIdx);
    console.log("destination", toDragElIdx);

    const reorderedList = Array.from(list);
    const [removed] = reorderedList.splice(fromDragElIdx, 1);
    reorderedList.splice(toDragElIdx, 0, removed);

    console.log("reordered containers", reorderedList);
    return reorderedList;
  }

  function containersDragEndHandler(DropRes: DropResult) {
    console.log("container is drag");
    setIsDragContainer(false);
    tasksDragEndHandler(DropRes);
  }

  function containerBegoreDragHandler(dragData: DragStart) {
    console.log("containerBeforeDragHandler");
    console.log(dragData);
    if (dragData.draggableId.indexOf("container") > -1) {
      console.log("container", dragData.draggableId);
      setIsDragContainer(true);
    }
  }

  return (
    <div className="App min-h-screen bg-slate-900">
      <header className="w-full text-slate-100 h-12 bg-slate-700 shadow-md">
        {width}
      </header>
      <DragDropContext
        onDragEnd={containersDragEndHandler}
        // onBeforeDragStart={containerBegoreDragHandler}
        onBeforeCapture={containerBegoreDragHandler}
      >
        <Droppable
          droppableId={"containersDropzone"}
          // isDropDisabled={!isDragContainer}
          direction="horizontal"
          type="container"
        >
          {(providedContainers, snapshot) => (
            <div
              {...providedContainers.droppableProps}
              ref={providedContainers.innerRef}
              className={`bg-blue-400 min-h-fit container-for-TasksContainers not-xs:px-1.5 text-slate-50 border-b-2 border-slate-400 flex flex-row flex-wrap xs:child:my-2 not-xs:child:mt-5 not-xs:child:mr-2 last-child:mr-0`}
            >
              {/* <DragDropContext onDragEnd={tasksDragEndHandler}> */}
              {tasksContainerArr.length
                ? tasksContainerArr.map(
                    ({ taskContainerName, issues }, droppableIdx) => (
                      <div
                        // {...provided.droppableProps}
                        // ref={provided.innerRef}
                        className="task-container min-h-full"
                        // ref={tasksContainerRefHeight}
                        key={`${taskContainerName}-${droppableIdx}`}
                      >
                        <TasksContainer
                          containerName={taskContainerName}
                          droppableId={droppableIdx}
                          tasksDragEndHandler={tasksDragEndHandler}
                          isDropDisabled={isDragContainer}
                        >
                          {issues.length
                            ? issues.map((issue, idx) => (
                                <DraggableIssueBox
                                  draggableId={`task-${droppableIdx}-${idx}`}
                                  idx={idx}
                                  issue={{ ...issue }}
                                  key={`${idx}-${issue.type}-${issue.title}`}
                                  isDragDisabled={isDragContainer}
                                />
                              ))
                            : null}
                        </TasksContainer>
                      </div>
                    )
                  )
                : null}
              <div className="bg-green-400">
                {providedContainers.placeholder}
              </div>
              {/* </DragDropContext> */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
