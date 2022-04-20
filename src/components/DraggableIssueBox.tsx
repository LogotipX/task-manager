import React from "react";
import { Draggable } from "react-beautiful-dnd";

import IssueBox from "./IssueBox";

type TProps = {
  draggableId: string;
  idx: number;
  issue: {
    type: string;
    title: string;
    text: string;
  };
};

export default function DraggableIssueBox(props: TProps) {
  return (
    <Draggable draggableId={props.draggableId} index={props.idx}>
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
          />
        </div>
      )}
    </Draggable>
  );
}
