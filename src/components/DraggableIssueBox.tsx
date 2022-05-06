import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import IssueBox from "./IssueBox";
import { Issue } from "../api/types";

type TProps = {
  draggableId: string;
  editIssue(containerIdx: number, issueIdx: number, newIssue: Issue): void;
  removeIssue(issueId: number): void;
  idx: number;
  containerIdx: number;
  issue: Issue;
  onClick(): void;
};

export default function DraggableIssueBox(props: TProps) {
  const [disableDrag, setDisableDrag] = useState(false);

  function editIssue(
    containerIdx: number,
    issueIdx: number,
    editedIssue: Issue
  ) {
    // props.editIssue(editedIssue);
    props.editIssue(containerIdx, issueIdx, editedIssue);
  }

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
            issueIdx={props.idx}
            containerIdx={props.containerIdx}
            editIssue={editIssue}
            onClick={props.onClick}
          />
        </div>
      )}
    </Draggable>
  );
}
