import React from "react";

type TProps = {
  type: string;
  title: string;
  text: string;
  // priority: string;
};

function IssueBox(props: TProps) {
  return (
    <div className={"issue-box rounded-sm bg-slate-700 px-2 py-3"}>
      <div className="issue__type text-slate-300">{props.type}</div>
      <div className="task__title pt-1 font-bold text-slate-100 text-base overflow-x-hidden overflow-ellipsis">
        {props.title}
      </div>
      <div className="task__text text-slate-100 break-words">{props.text}</div>
      {/* <div className="task__priority">{props.priority}</div> */}
    </div>
  );
}

export default IssueBox;
