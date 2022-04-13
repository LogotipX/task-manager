import React, { useState } from "react";
import IssueBox from "./IssueBox";

type TProps = {
  className?: string;
  containerName?: string;
};

export default function TasksContainer(props: TProps) {
  const classNames =
    "task-container p-2 text-sm xs:w-screen w-72 text-slate-100 bg-slate-800 border-2 border-dashed border-slate-100 rounded-sm";

  const [visibility, setVisibility] = useState("invisible");

  return (
    <div
      onMouseEnter={() => setVisibility("visible")}
      onMouseLeave={() => setVisibility("invisible")}
      className={`${props.className} ${classNames}`}
    >
      <div className="container__name uppercase">{props.containerName}</div>
      <IssueBox />
      <div className={`button__create-issue ${visibility}`}>Create issue</div>
    </div>
  );
}
