import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.scss";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import DraggableIssueBox from "./components/issue/DraggableIssueBox";
import getIssues from "./api/api";
import IssueInputForm from "./components/issue/IssueInputForm";
import DraggableTasksContainer from "./components/tasks_container/DraggableTasksContainer";
import { reorderTasks, reorderContainers } from "./api/reorders";
import IssueBoxModalWIndow from "./components/modals/IssueBoxModalWindow";

import { Issue, TasksContainerArr } from "./api/types";
import Button from "./components/Button";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [tasksContainerArr, setTasksContainerArr] = useState<TasksContainerArr>(
    []
  );

  const [issueModalObject, setIssueModalObject] = useState({
    containerIdx: -1,
    issueIdx: -1,
  });

  function getWindowWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", getWindowWidth);

    getIssues.then((res: TasksContainerArr) => {
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
      const reorderedContainers: TasksContainerArr = reorderContainers(
        reorderedTasksContainer,
        result.source.index,
        result.destination.index
      );
      setTasksContainerArr(reorderedContainers);
      return;
    }

    const reorderedList: TasksContainerArr = reorderTasks(
      reorderedTasksContainer,
      result.source.index,
      result.destination.index,
      Number(result.source.droppableId),
      Number(result.destination.droppableId)
    );

    setTasksContainerArr(reorderedList);
  }

  function createContainer() {
    setTasksContainerArr([
      ...tasksContainerArr,
      { owner: "", taskContainerName: "new container", issues: [] },
    ]);
  }

  function changeContainerName(containerId: number, newName: string) {
    const changedTasksContainerArr = tasksContainerArr.slice(
      0,
      tasksContainerArr.length
    );
    changedTasksContainerArr[containerId].taskContainerName = newName;

    setTasksContainerArr(changedTasksContainerArr);
  }

  function createIssueBtn(containerId: number) {
    // if (hasCreateIssueBlock) return;

    const containerArr = Array.from(tasksContainerArr);
    const formCreate = {
      owner: "",
      type: "",
      title: "",
      text: "",
      checked: false,
      isFormCreate: true,
    };
    containerArr[containerId].issues.push(formCreate);
    setTimeout(() => setTasksContainerArr(containerArr), 0);
  }

  function addIssueFromCreateForm(
    newIssue: Issue,
    issueIdx: number,
    containerIdx: number
  ) {
    const containerArr = Array.from(tasksContainerArr);
    const id = containerIdx;

    if (!newIssue.title.length && !newIssue.text.length) {
      containerArr[id].issues.pop();
      setTasksContainerArr(containerArr);
      return;
    }

    containerArr[id].issues.pop();
    containerArr[id].issues.push(newIssue);

    setTasksContainerArr(containerArr);
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

  function showIssueModal(containerIdx: number, issueIdx: number) {
    setIssueModalObject({ containerIdx, issueIdx });
  }

  function deleteContainer(containerId: number) {
    const containerList = tasksContainerArr.slice(0, tasksContainerArr.length);
    containerList.splice(containerId, 1);
    setTasksContainerArr(containerList);
  }

  return (
    <div
      className={`App relative h-screen min-h-screen overflow-hidden bg-slate-900 `}
      tabIndex={issueModalObject.containerIdx >= 0 ? -1 : 0}
    >
      {issueModalObject.containerIdx >= 0 ? (
        <IssueBoxModalWIndow
          issue={
            tasksContainerArr[issueModalObject["containerIdx"]].issues[
              issueModalObject["issueIdx"]
            ]
          }
          containerIdx={issueModalObject.containerIdx}
          issueIdx={issueModalObject.issueIdx}
          getUpdatedIssue={editIssue}
          closeModal={() =>
            setIssueModalObject({ containerIdx: -1, issueIdx: -1 })
          }
        />
      ) : null}
      <header className="w-full text-slate-100 h-12 bg-slate-700 shadow-md">
        {width}
      </header>
      <div className="h-[calc(100%-48px)]">
        <div className="tasks-list overflow-auto h-full">
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
                  className={`container-for-TasksContainers flex flex-row flex-nowrap relative min-h-fit text-slate-50 border-b-2 border-slate-400 not-xs:px-1.5 pt-5 px-1 pb-2`}
                >
                  {tasksContainerArr.length
                    ? tasksContainerArr.map(
                        ({ taskContainerName, issues }, droppableIdx) => {
                          return (
                            <div
                              className={`task-container-wrapper min-h-full xs:w-11/12 child:mr-2`}
                              key={`${taskContainerName}-${droppableIdx}`}
                            >
                              <DraggableTasksContainer
                                containerName={taskContainerName}
                                droppableId={droppableIdx}
                                tasksDragEndHandler={dragEndHandler}
                                createIssue={createIssueBtn}
                                changeContainerName={(newName) =>
                                  changeContainerName(droppableIdx, newName)
                                }
                                deleteContainer={() =>
                                  deleteContainer(droppableIdx)
                                }
                              >
                                {issues.length
                                  ? issues.map((issue, idx) => {
                                      if (issue.isFormCreate) {
                                        return (
                                          <div
                                            key={`${idx}-${issue.type}-${issue.title}`}
                                          >
                                            <IssueInputForm
                                              onConfirm={(editedIssue) => {
                                                addIssueFromCreateForm(
                                                  editedIssue,
                                                  idx,
                                                  droppableIdx
                                                );
                                              }}
                                              // containerIdx={droppableIdx}
                                              // issueIdx={idx}
                                            />
                                          </div>
                                        );
                                      } else
                                        return (
                                          <DraggableIssueBox
                                            draggableId={`task-${droppableIdx}-${idx}`}
                                            issueIdx={idx}
                                            containerIdx={droppableIdx}
                                            issue={{ ...issue }}
                                            key={`${idx}-${issue.type}-${issue.title}`}
                                            removeIssue={(issueId) =>
                                              removeIssue(droppableIdx, issueId)
                                            }
                                            editIssue={editIssue}
                                            onClick={() =>
                                              showIssueModal(droppableIdx, idx)
                                            }
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
                  <div className="create-container__button">
                    <Button clickHandler={createContainer}>
                      <div className="px-4">+</div>
                    </Button>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
