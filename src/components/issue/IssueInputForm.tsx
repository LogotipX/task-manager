import React, { useEffect, useState } from "react";
import Button from "../Button";
import { Issue } from "../../api/types";
import OneLineInput from "../OneLineInput";

type Props = {
  getEditedIssue?(editedIssue: Issue): void;
  issue?: Issue;
  canBeEmpty?: boolean;
};

export default function IssueInputForm(props: Props) {
  const [type, setType] = useState("Task");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const editedIssue: Issue = {
    type,
    title,
    text,
    // priority: "some priority",
  };

  useEffect(() => {
    if (props.issue) {
      setType(props.issue.type);
      setTitle(props.issue.title);
      setText(props.issue.text);
    }
  }, [props.issue]);

  function keyPressHandler(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      submitHandler();
    }
  }

  function submitHandler() {
    if (props.getEditedIssue) {
      props.getEditedIssue(editedIssue);
    }
  }

  return (
    <div className={"issue-box rounded-sm bg-slate-700 px-2 py-3"}>
      <div className="issue__type text-slate-300">Type</div>
      <div className="task__title pt-1 font-bold text-slate-100 text-base">
        <OneLineInput title={title} setTitle={setTitle} enterKeyPressHandler={keyPressHandler} />
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
        <Button clickHandler={submitHandler}>Confirm</Button>
      </div>
      {/* <div className="task__priority">{props.priority}</div> */}
    </div>
  );
}
