import React, { useState } from "react";
import IssueBox from "./IssueBox";

type TProps = {
  className?: string;
  containerName?: string;
};

export default function TasksContainer(props: TProps) {
  const [visibility, setVisibility] = useState("invisible");

  const IssueArr = [
    {
      type: "Task",
      title: "IssueBox",
      text: "Refactor IssueBox component: need add functional and interpase",
      // priority: "some priority",
      className: "my-2",
    },
    {
      type: "Task",
      title: "IssueBox",
      text: "Refactor IssueBox component: need add functional and interpase",
      // priority: "some priority",
      className: "my-2",
    },
    {
      type: "Task",
      title: "IssueBox",
      text: "Refactor IssueBox component: need add functional and interpase",
      // priority: "some priority",
      className: "my-2",
    },
  ];

  return (
    <>
      <div
        onMouseEnter={() => setVisibility("visible")}
        onMouseLeave={() => setVisibility("invisible")}
        className={`${props.className} task-container p-1 text-sm xs:w-screen w-72 text-slate-100 bg-slate-800 border-2 border-dashed border-slate-400 rounded-sm`}
      >
        <div className="container__name uppercase pl-2">
          {props.containerName}
        </div>
        {IssueArr.map((i) => (
          <IssueBox
            type={i.type}
            title={i.title}
            text={i.text}
            className={i.className}
          />
        ))}
        <div
          className={`button__create-issue ${visibility} px-1 py-2 mb-1 font-bold hover:bg-slate-600 active:bg-slate-700 cursor-pointer rounded-sm`}
        >
          + Create issue
        </div>
      </div>
    </>
  );
}
