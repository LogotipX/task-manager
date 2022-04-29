import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TasksContainer from "./TasksContainer";
import { DropResult } from "react-beautiful-dnd";

type Props = {
  className?: string;
  containerName?: string;
  children?: React.ReactNode;
  droppableId: number;
  tasksDragEndHandler?(result: DropResult): void;
  containersDragEndHandler?(result: DropResult): void;
  createIssue(containerId: any): any;
};

export default function DraggableTasksContainer(props: Props) {
  const [visibility, setVisibility] = useState(false);

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
          onMouseEnter={() => setVisibility(true)}
          onMouseLeave={() => setVisibility(false)}
          className={`${props.className} task-container relative p-1 text-sm h-full min-h-max w-72 text-slate-100 bg-slate-800 border-2 border-dashed border-slate-400 rounded-sm`}
        >
          <div
            ref={providedContainers.innerRef}
            // {...providedContainers.draggableProps}
            {...providedContainers.dragHandleProps}
            className="container__name uppercase pl-2 pt-2"
          >
            {props.containerName}
          </div>
          <TasksContainer
            droppableId={props.droppableId}
            createIssue={props.createIssue}
            containerHover={visibility}
          >
            {props.children}
          </TasksContainer>
        </div>
      )}
    </Draggable>
  );
}
