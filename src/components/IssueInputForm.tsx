import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Issue } from "../api/types";

type Props = {
  onSubmit(containerIdx: number, issueIdx: number, issue?: Issue): void;
  containerIdx: number;
  issueIdx: number;
  issue?: Issue;
};

export default function IssueInputForm(props: Props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const issue: Issue = {
    type: "Task",
    title,
    text,
    // priority: "some priority",
  };

  useEffect(() => {
    if (props.issue?.title !== undefined) {
      setTitle(props.issue.title);
    }

    if (props.issue?.text !== undefined) {
      setText(props.issue.text);
    }
  }, [props.issue?.title, props.issue?.text]);

  function keyPressHandler(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      props.onSubmit(props.containerIdx, props.issueIdx, issue);
    }
  }

  return (
    <div className={"issue-box rounded-sm bg-slate-700 px-2 py-3"}>
      <div className="issue__type text-slate-300">Type</div>
      <div className="task__title pt-1 font-bold text-slate-100 text-base">
        <input
          className="bg-slate-500 rounded-sm p-1 w-full"
          type="text"
          autoFocus
          placeholder="Issue title"
          value={title}
          maxLength={64}
          onChange={(input) => setTitle(input.target.value)}
          onKeyDown={keyPressHandler}
        />
      </div>
      <div className="task__text text-slate-100 mt-2">
        <textarea
          className="bg-slate-500 rounded-sm p-1 w-full"
          placeholder="Issue text"
          required={true}
          cols={2}
          rows={2}
          value={text}
          maxLength={255}
          onChange={(input) => setText(input.target.value)}
          onKeyDown={keyPressHandler}
        />
      </div>
      <div className="button__wrapper mt-1">
        <Button
          clickHandler={() =>
            props.onSubmit(props.containerIdx, props.issueIdx, issue)
          }
        >
          Confirm
        </Button>
      </div>
      {/* <div className="task__priority">{props.priority}</div> */}
    </div>
  );
}
