import React, { Children, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TasksContainer from "./TasksContainer";
import { DropResult } from "react-beautiful-dnd";
import OneLineInput from "../OneLineInput";
import TasksContainerHeader from "./TasksContainerHeader";
// SVG -------------------------------------------------------------
import ConfirmIcon from "../../icons/ConfirmIcon";
import Button from "../Button";
import CancelIcon from "../../icons/CancelIcon";

type Props = {
  className?: string;
  containerName: string;
  children?: React.ReactNode;
  droppableId: number;
  tasksDragEndHandler?(result: DropResult): void;
  containersDragEndHandler?(result: DropResult): void;
  createIssue(containerId: any): any;
  changeContainerName(newContainerName: string): void;
};

export default function DraggableTasksContainer(props: Props) {
  const [containerHover, setContainerHover] = useState(false);
  // const [containerHeaderHover, setContainerHeaderHover] = useState(false);
  const [editContainerName, setEditContainerName] = useState(false);
  const [newContainerName, setNewContainerName] = useState(props.containerName);

  function enterKeyPressHandler(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      changeContainerNameHandler();
    }
  }

  function changeContainerNameHandler() {
    // setContainerHeaderHover(false);
    setEditContainerName(false);

    if (newContainerName.length > 0) {
      props.changeContainerName(newContainerName);
    } else {
      setNewContainerName(props.containerName);
    }
  }

  function cancelChangeContainerName() {
    setEditContainerName(false);
    setNewContainerName(props.containerName);
  }

  return (
    <Draggable
      draggableId={`container-${props.droppableId}`}
      index={props.droppableId}
    >
      {(providedContainers, snapshot) => (
        <div
          ref={providedContainers.innerRef}
          {...providedContainers.draggableProps}
          // {...providedContainers.dragHandleProps}
          onMouseEnter={() => setContainerHover(true)}
          onMouseLeave={() => setContainerHover(false)}
          className={`${props.className} task-container relative p-1 text-sm h-full min-h-max w-72 text-slate-100 bg-slate-800 border-2 border-dashed border-slate-400 rounded-sm`}
        >
          <div
            ref={providedContainers.innerRef}
            // {...providedContainers.draggableProps}
            {...providedContainers.dragHandleProps}
            onDoubleClick={() => setEditContainerName(true)}
            className="mb-2"
          >
            {editContainerName ? (
              <div className="container__name flex pb-[2px]">
                <OneLineInput
                  value={newContainerName}
                  setValue={setNewContainerName}
                  enterKeyPressHandler={enterKeyPressHandler}
                  onFocusOut={() => changeContainerNameHandler()}
                  className="container__name flex text-lg p-2 outline-none"
                />
                <div className="reduct-btns absolute top-[52px] right-1 z-10 border-2 border-slate-400 rounded-sm bg-slate-700">
                  <div className="btn__confirm inline-block">
                    <Button clickHandler={() => changeContainerNameHandler()}>
                      <ConfirmIcon className="fill-slate-50 w-6 h-4" />
                    </Button>
                  </div>
                  <div className="btn__cancel inline-block">
                    <Button clickHandler={() => cancelChangeContainerName()}>
                      <CancelIcon className="fill-slate-50 w-6 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <TasksContainerHeader
                elementsCount={Children.count(props.children)}
                containerName={props.containerName}
                editBtnClick={() => setEditContainerName(true)}
              />
            )}
          </div>
          <TasksContainer
            droppableId={props.droppableId}
            createIssue={props.createIssue}
            containerHover={containerHover}
          >
            {props.children}
          </TasksContainer>
        </div>
      )}
    </Draggable>
  );
}
