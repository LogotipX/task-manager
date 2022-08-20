import React, { useEffect, useState, useRef } from "react";
import Button from "../Button";
import { Issue } from "../../api/types";
import OneLineInput from "../OneLineInput";

type Props = {
  onConfirm(editedIssue: Issue): void;
  issue?: Issue;
  canBeEmpty?: boolean;
};

export default function IssueInputForm(props: Props) {
  const issueBoxEditForm = useRef<HTMLHeadingElement>(null);

  const [type, setType] = useState("Task");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);

  const editedIssue: Issue = {
    type,
    title,
    text,
    checked,
    // priority: "some priority",
  };

  useEffect(() => {
    window.addEventListener("click", onBlurHandler);

    return () => {
      window.removeEventListener("click", onBlurHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedIssue]);

  useEffect(() => {
    if (props.issue) {
      setType(props.issue.type);
      setTitle(props.issue.title);
      setText(props.issue.text);
      setChecked(props.issue.checked);
    }
  }, [props.issue]);

  function keyPressHandler(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      submitHandler();
    }
  }

  function submitHandler() {
    props.onConfirm(editedIssue);
  }

  function onBlurHandler(e: MouseEvent) {
    if (!isClickOnIssueBoxEditForm(e)) {
      submitHandler();
    }
  }

  function isClickOnIssueBoxEditForm(e: MouseEvent) {
    const clickCoords = {
      x: e.clientX,
      y: e.clientY,
    };

    const issueBoxEditFormCoords =
      issueBoxEditForm.current?.getBoundingClientRect();

    if (!issueBoxEditFormCoords) return;

    const issueBoxEditFormSize = {
      width: issueBoxEditForm?.current?.offsetWidth || 0,
      height: issueBoxEditForm?.current?.offsetHeight || 0,
    };

    return (
      clickCoords.x >= issueBoxEditFormCoords?.x &&
      clickCoords.x <= issueBoxEditFormCoords?.x + issueBoxEditFormSize.width &&
      clickCoords.y >= issueBoxEditFormCoords?.y &&
      clickCoords.y <= issueBoxEditFormCoords?.y + issueBoxEditFormSize.height
    );
  }

  return (
    <div
      ref={issueBoxEditForm}
      onClick={(e) => e.stopPropagation()}
      className={"issue-box rounded-sm bg-slate-700 px-2 py-3"}
    >
      <div className="issue__type text-slate-300">Type</div>
      <div className="task__title pt-1 font-bold text-slate-100 text-base">
        <OneLineInput
          value={title}
          setValue={setTitle}
          enterKeyPressHandler={keyPressHandler}
        />
      </div>
      <div className="task__text text-slate-100 mt-2">
        <textarea
          className="bg-slate-500 rounded-sm p-1 w-full"
          placeholder="Issue text"
          cols={2}
          rows={3}
          value={text}
          maxLength={255}
          onChange={(input) => setText(input.target.value)}
          onKeyDown={keyPressHandler}
        />
      </div>
      <div className="button__wrapper mt-1">
        <Button clickHandler={() => submitHandler()}>Confirm</Button>
      </div>
      {/* <div className="task__priority">{props.priority}</div> */}
    </div>
  );
}
