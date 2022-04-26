import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.scss";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import DraggableIssueBox from "./components/DraggableIssueBox";
import TasksContainer from "./components/TasksContainer";
import getIssues from "./api/api";
import CreateIssueBox from "./components/CreateIssueBox";

type tasksContainerArr = {
  taskContainerName: string;
  issues: issueArr;
}[];

type issueArr = Issue[];

type Issue = {
  type: string;
  title: string;
  text: string;
  isFormCreate?: boolean;
};

type createdIssue = {
  containerIdx: number;
  issue: Issue;
};

function App() {
  const [width, setWidth] = useState(window.innerWidth);
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

  function dragEndHandler(result: DropResult): void {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedTasksContainer = tasksContainerArr.slice(
      0,
      tasksContainerArr.length
    );
    const idxElPositionFrom: number = Number(result.source.index);
    const idxElPositionTo: number = Number(result.destination.index);

    const idxFromContainer: number = Number(result.source.droppableId);
    const idxToContainer: number = Number(result.destination.droppableId);

    if (result.destination.droppableId.indexOf("containersDropzone") > -1) {
      const reorderedContainers: tasksContainerArr = reorderContainers(
        reorderedTasksContainer,
        idxElPositionFrom,
        idxElPositionTo
      );
      setTasksContainerArr(reorderedContainers);
      return;
    }

    const reorderedList: tasksContainerArr = reorderTasks(
      reorderedTasksContainer,
      result.source.index,
      result.destination.index,
      idxFromContainer,
      idxToContainer
    );

    setTasksContainerArr(reorderedList);
  }

  function reorderTasks(
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
    const reorderedList = Array.from(list);
    const [removed] = reorderedList.splice(fromDragElIdx, 1);
    reorderedList.splice(toDragElIdx, 0, removed);

    return reorderedList;
  }

  function btnCreateIssue(containerId: number) {
    if (typeof containerId !== "number") return;

    const containerArr = Array.from(tasksContainerArr);
    containerArr[containerId].issues.push({
      type: "",
      title: "",
      text: "",
      isFormCreate: true,
    });
    setTimeout(() => setTasksContainerArr(containerArr), 0);
  }

  function addIssueFromCreate(newIssue: createdIssue) {
    const containerArr = Array.from(tasksContainerArr);
    const id = newIssue.containerIdx;
    containerArr[id].issues.pop();

    containerArr[id].issues.push(newIssue.issue);

    setTasksContainerArr(containerArr);
  }

  return (
    <div className="App min-h-screen overflow-hidden bg-slate-900">
      <header className="w-full text-slate-100 h-12 bg-slate-700 shadow-md">
        {width}
      </header>
      <DragDropContext onDragEnd={dragEndHandler}>
        <Droppable
          droppableId={"containersDropzone"}
          direction="horizontal"
          type="container"
        >
          {(providedContainers, snapshot) => (
            <div
              {...providedContainers.droppableProps}
              ref={providedContainers.innerRef}
              className={`container-for-TasksContainers flex flex-row flex-nowrap relative overflow-x-scroll min-h-fit text-slate-50 border-b-2 border-slate-400 not-xs:px-1.5 pt-5 px-1 pb-2`}
            >
              {tasksContainerArr.length
                ? tasksContainerArr.map(
                    ({ taskContainerName, issues }, droppableIdx) => {
                      return (
                        <div
                          className={`task-container-wrapper min-h-full xs:w-11/12 child:mr-2 ${
                            droppableIdx === tasksContainerArr.length - 1
                              ? "child:mr-0"
                              : null
                          }`}
                          key={`${taskContainerName}-${droppableIdx}`}
                        >
                          <TasksContainer
                            containerName={taskContainerName}
                            droppableId={droppableIdx}
                            tasksDragEndHandler={dragEndHandler}
                            createIssue={btnCreateIssue}
                          >
                            {issues.length
                              ? issues.map((issue, idx) =>
                                  issue.isFormCreate ? (
                                    <div
                                      key={`${idx}-${issue.type}-${issue.title}`}
                                    >
                                      <CreateIssueBox
                                        addIssue={addIssueFromCreate}
                                        containerIdx={droppableIdx}
                                      />
                                    </div>
                                  ) : (
                                    <DraggableIssueBox
                                      draggableId={`task-${droppableIdx}-${idx}`}
                                      idx={idx}
                                      issue={{ ...issue }}
                                      key={`${idx}-${issue.type}-${issue.title}`}
                                    />
                                  )
                                )
                              : null}
                          </TasksContainer>
                        </div>
                      );
                    }
                  )
                : null}
              {providedContainers.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
