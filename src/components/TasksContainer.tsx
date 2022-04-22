import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

type TProps = {
  className?: string;
  containerName?: string;
  children?: React.ReactNode;
  droppableId: number;
  isDragContainer?: boolean;
  tasksDragEndHandler?(result: DropResult): void;
  containersDragEndHandler?(result: DropResult): void;
};

export default function TasksContainer(props: TProps | any) {
  const [visibility, setVisibility] = useState("invisible");

  return (
    <>
      <Draggable
        draggableId={`container-${props.droppableId}`}
        index={props.droppableId}
        // isDragDisabled={!props.isDragContainer}
      >
        {(providedContainers, snapshot) => (
          <div
            ref={providedContainers.innerRef}
            {...providedContainers.draggableProps}
            // {...provided.dragHandleProps}
            onMouseEnter={() => setVisibility("visible")}
            onMouseLeave={() => setVisibility("invisible")}
            className={`${props.className} task-container relative p-1 text-sm h-full xs:w-screen min-h-max w-72 text-slate-100 bg-slate-800 border-2 border-dashed border-slate-400 rounded-sm`}
          >
            <div
              ref={providedContainers.innerRef}
              // {...provided.draggableProps}
              {...providedContainers.dragHandleProps}
              className="container__name uppercase pl-2 mt-2"
            >
              {props.containerName}
            </div>
            <Droppable
              droppableId={String(props.droppableId)}
              isDropDisabled={props.isDragContainer}
            >
              {(provided, snapshot) => (
                <div
                  className="droppable-container child:mt-2 h-[91%] rounded-sm"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {props.children}
                  {provided.placeholder}
                  <div className="button__container w-full pb-1 mt-2">
                    <div
                      className={`button__create-issue ${
                        props.children ? visibility : "visible"
                      } xs:visible px-1 py-2 mb-1 font-bold hover:bg-slate-600 active:bg-slate-700 cursor-pointer rounded-sm`}
                    >
                      + Create issue
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
}
