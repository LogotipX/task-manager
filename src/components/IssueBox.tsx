import { title } from "process";
import { useState } from "react";
import SvgDots from "../icons/dots-3";
import Button from "./Button";
import CreateIssueBox from "./CreateIssueBox";
import IssueContextMenu from "./IssueContextMenu";

type TProps = {
  type: string;
  title: string;
  text: string;
  // priority: string;
  disableDrag(param: boolean): void;
  removeIssue(): void;
};

function IssueBox(props: TProps) {
  const [issueContextMenuVisibility, setIssueContextMenuVisibility] =
    useState(false);
  const [issueEditFormVisibility, setIssueEditFormVisibility] = useState(false);

  return (
    <>
      <div
        className={`issue-box ${
          issueEditFormVisibility ? "hidden" : "block"
        } relative rounded-sm bg-slate-700 px-2 py-3 hover:bg-slate-500`}
        onDoubleClick={() => setIssueEditFormVisibility(true)}
      >
        <div className="issue-box__header flex justify-between">
          <div className="issue__type text-slate-300">{props.type}</div>
          <div
            onMouseEnter={() => props?.disableDrag(true)}
            onMouseLeave={() => props?.disableDrag(false)}
            className="issue-box__settings"
          >
            <Button clickHandler={() => setIssueContextMenuVisibility(true)}>
              <SvgDots className="fill-slate-50 w-6 z-10" />
            </Button>
            <IssueContextMenu
              visibility={issueContextMenuVisibility}
              editIssue={() => {
                setIssueEditFormVisibility(true);
                setIssueContextMenuVisibility(false);
              }}
              setVisibility={setIssueContextMenuVisibility}
              removeIssue={props.removeIssue}
            />
          </div>
        </div>
        <div className={`issue`}>
          <div className="issue__title pt-1 font-bold text-slate-100 text-base overflow-x-hidden overflow-ellipsis">
            {props.title}
          </div>
          <div className="issue__text text-slate-100 break-words">
            {props.text}
          </div>
          {/* <div className="task__priority">{props.priority}</div> */}
        </div>
      </div>
      <div
        className={`issue__edit-form ${
          issueEditFormVisibility ? "block" : "hidden"
        }`}
      >
        <CreateIssueBox
          addIssue={() => console.log("edit issue")}
          containerIdx={0}
          title={props.title}
          text={props.text}
        />
      </div>
    </>
  );
}

export default IssueBox;
