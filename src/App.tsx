import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.scss";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import DraggableIssueBox from "./components/DraggableIssueBox";
import getIssues from "./api/api";
import IssueInputForm from "./components/IssueInputForm";
import DraggableTasksContainer from "./components/DraggableTasksContainer";
import { reorderTasks, reorderContainers } from "./api/reorders";
import IssueBoxModalWIndow from "./components/IssueBoxModalWindow";

export type tasksContainerArr = {
  taskContainerName: string;
  issues: issueArr;
}[];

export type Issue = {
  type: string;
  title: string;
  text: string;
  isFormCreate?: boolean;
};

export type issueWrapperId = {
  containerIdx: number;
  issueIdx: number;
  issue: Issue;
};

type issueArr = Issue[];

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [tasksContainerArr, setTasksContainerArr] = useState<tasksContainerArr>(
    []
  );
  const [hasCreateIssueBlock, setHasCreateIssueBlock] = useState(false);

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

    if (result.destination.droppableId.indexOf("containersDropzone") > -1) {
      const reorderedContainers: tasksContainerArr = reorderContainers(
        reorderedTasksContainer,
        result.source.index,
        result.destination.index
      );
      setTasksContainerArr(reorderedContainers);
      return;
    }

    const reorderedList: tasksContainerArr = reorderTasks(
      reorderedTasksContainer,
      result.source.index,
      result.destination.index,
      Number(result.source.droppableId),
      Number(result.destination.droppableId)
    );

    setTasksContainerArr(reorderedList);
  }

  function createIssueBtn(containerId: number) {
    if (hasCreateIssueBlock) return;

    setHasCreateIssueBlock(true);

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

  function addIssueFromCreateForm(
    containerIdx: number,
    issueIdx: number,
    newIssue: Issue
  ) {
    if (!newIssue.title.length && !newIssue.text.length) return;

    const containerArr = Array.from(tasksContainerArr);
    const id = containerIdx;

    containerArr[id].issues.pop();
    containerArr[id].issues.push(newIssue);

    setTasksContainerArr(containerArr);
    setHasCreateIssueBlock(false);
  }

  function editIssue(
    containerIdx: number,
    issueIdx: number,
    editedIssue: Issue
  ) {
    const containerArr = Array.from(tasksContainerArr);
    containerArr[containerIdx].issues.splice(issueIdx, 1, editedIssue);

    setTasksContainerArr(containerArr);
  }

  function removeIssue(containerIdx: number, issueIdx: number) {
    const containerArr = Array.from(tasksContainerArr);
    containerArr[containerIdx].issues.splice(issueIdx, 1);

    setTasksContainerArr(containerArr);
  }

  return (
    <div className="App min-h-screen relative overflow-hidden bg-slate-900">
      {tasksContainerArr.length ? (
        <IssueBoxModalWIndow
          issue={tasksContainerArr[0].issues[0]}
          closeModal={() => console.log("close Modal")}
        />
      ) : null}
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
                          <DraggableTasksContainer
                            containerName={taskContainerName}
                            droppableId={droppableIdx}
                            tasksDragEndHandler={dragEndHandler}
                            createIssue={createIssueBtn}
                          >
                            {issues.length
                              ? issues.map((issue, idx) => {
                                  if (issue.isFormCreate) {
                                    return (
                                      <div
                                        key={`${idx}-${issue.type}-${issue.title}`}
                                      >
                                        <IssueInputForm
                                          onSubmit={addIssueFromCreateForm}
                                          containerIdx={droppableIdx}
                                          issueIdx={idx}
                                        />
                                      </div>
                                    );
                                  } else
                                    return (
                                      <DraggableIssueBox
                                        draggableId={`task-${droppableIdx}-${idx}`}
                                        idx={idx}
                                        containerIdx={droppableIdx}
                                        issue={{ ...issue }}
                                        key={`${idx}-${issue.type}-${issue.title}`}
                                        removeIssue={(issueId) =>
                                          removeIssue(droppableIdx, issueId)
                                        }
                                        editIssue={editIssue}
                                      />
                                    );
                                })
                              : null}
                          </DraggableTasksContainer>
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
