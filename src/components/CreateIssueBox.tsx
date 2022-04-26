import React, { useState } from "react";
import Button from "./Button";

type Props = {
  addIssue(param: createdIssue): void;
  containerIdx: number;
};

type Issue = {
  type: string;
  title: string;
  text: string;
};

type createdIssue = {
  containerIdx: number;
  issue: Issue;
};

export default function CreateIssueBox(props: Props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const issueObj = {
    containerIdx: props.containerIdx,
    issue: {
      type: "Task",
      title,
      text,
      // priority: "some priority",
    },
  };

  function keyPressHandler(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      props.addIssue(issueObj);
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
          onChange={(input) => setText(input.target.value)}
          onKeyDown={keyPressHandler}
        />
      </div>
      <div className="button__wrapper mt-1">
        <Button clickHandler={() => props.addIssue(issueObj)}>Add issue</Button>
      </div>
      {/* <div className="task__priority">{props.priority}</div> */}
    </div>
  );
}
