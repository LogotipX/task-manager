import React from "react";
import { Draggable } from "react-beautiful-dnd";

import IssueBox from "./IssueBox";

type TProps = {
  idx: number;
  issue: {
    type: string;
    title: string;
    text: string;
    className?: string;
  };
};

export default function DraggableIssueBox(props: TProps) {
  const id = `${props.idx}-${props.issue.type}-${props.issue.title}`;

  return (
    <Draggable draggableId={id} index={props.idx}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <IssueBox
            type={props.issue.type}
            title={props.issue.title}
            text={props.issue.text}
            className={props.issue.className}
          />
        </div>
      )}
    </Draggable>
  );
}
