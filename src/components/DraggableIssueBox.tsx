import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import IssueBox from "./IssueBox";

type TProps = {
  draggableId: string;
  idx: number;
  issue: {
    type: string;
    title: string;
    text: string;
    isFormCreate?: boolean;
  };
  removeIssue(issueId: number): void;
};

export default function DraggableIssueBox(props: TProps) {
  const [disableDrag, setDisableDrag] = useState(false);

  function removeIssue() {
    props.removeIssue(props.idx);
  }

  return (
    <Draggable
      draggableId={props.draggableId}
      index={props.idx}
      isDragDisabled={disableDrag}
    >
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
            disableDrag={setDisableDrag}
            removeIssue={removeIssue}
          />
        </div>
      )}
    </Draggable>
  );
}
