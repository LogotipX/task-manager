import React from "react";
import { Droppable, DropResult } from "react-beautiful-dnd";
import Button from "../Button";

type TProps = {
  className?: string;
  containerName?: string;
  children?: React.ReactNode;
  droppableId: number;
  containerHover: boolean;
  tasksDragEndHandler?(result: DropResult): void;
  containersDragEndHandler?(result: DropResult): void;
  createIssue(containerId: number): void;
};

export default function TasksContainer(props: TProps) {
  return (
    <>
      <Droppable
        droppableId={String(props.droppableId)}
        direction="vertical"
        type="task"
        // mode="virtual"
      >
        {(provided, snapshot) => (
          <div
            className={`droppable-container h-[calc(100%-55px)] child:mt-2 rounded-sm`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.children}
            {provided.placeholder}
            {props.children || props.containerHover ? (
              <div
                className={`button__wrapper button__container w-full pb-1 mt-2 mb-1 xs:visible`}
              >
                <Button
                  clickHandler={() => props.createIssue(props.droppableId)}
                >
                  + Create issue
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </Droppable>
    </>
  );
}
