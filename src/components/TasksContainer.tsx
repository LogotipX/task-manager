import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

type TProps = {
  className?: string;
  containerName?: string;
  children?: React.ReactNode;
  dragEndHandler?(result: DropResult): void;
  dragStartHandler?(result: DropResult): void;
};

export default function TasksContainer(props: TProps | any) {
  const [visibility, setVisibility] = useState("invisible");

  return (
    <>
      <div
        onMouseEnter={() => setVisibility("visible")}
        onMouseLeave={() => setVisibility("invisible")}
        className={`${props.className} task-container relative p-1 text-sm h-full xs:w-screen min-h-max w-72 text-slate-100 bg-slate-800 border-2 border-dashed border-slate-400 rounded-sm`}
      >
        <div className="container__name uppercase pl-2">
          {props.containerName}
        </div>
        <DragDropContext
          onDragEnd={props.dragEndHandler}
          onDragStart={props.dragStartHandler}
        >
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {props.children}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="button__container w-full absolute left-0 bottom-1 px-1">
          <div
            className={`button__create-issue ${visibility} px-1 py-2 mb-1 font-bold hover:bg-slate-600 active:bg-slate-700 cursor-pointer rounded-sm`}
          >
            + Create issue
          </div>
        </div>
      </div>
    </>
  );
}
