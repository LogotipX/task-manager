import React from "react";

type TProps = {
  type: string;
  title: string;
  text: string;
  // priority: string;
  // className?: string;
};

function IssueBox(props: TProps) {
  return (
    <div className={"rounded-sm bg-slate-700 px-2 py-3"}>
      <div className="issue__type text-slate-300">{props.type}</div>
      <div className="task__title pt-1 font-bold text-slate-100 text-base">
        {props.title}
      </div>
      <div className="task__tex text-slate-100">{props.text}</div>
      {/* <div className="task__priority">{props.priority}</div> */}
    </div>
  );
}

export default IssueBox;
