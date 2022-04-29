import { useEffect, useState } from "react";
import SvgDots from "../icons/dots-3";
import Button from "./Button";
import IssueInputForm from "./IssueInputForm";
import IssueContextMenu from "./IssueContextMenu";

import { Issue } from "../App";

type TProps = {
  type: string;
  title: string;
  text: string;
  issueIdx: number;
  containerIdx: number;
  // priority: string;
  disableDrag(param: boolean): void;
  editIssue(containerIdx: number, issueIdx: number, newIssue: Issue): void;
  removeIssue(): void;
};

function IssueBox(props: TProps) {
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);
  const [type, setType] = useState(props.type);

  useEffect(() => {
    setType(props.type);
    setTitle(props.title);
    setText(props.text);
  }, [props]);

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
          <div className="issue__type text-slate-300">{type}</div>
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
            {title}
          </div>
          <div className="issue__text text-slate-100 break-words">{text}</div>
          {/* <div className="task__priority">{props.priority}</div> */}
        </div>
      </div>
      <div
        className={`issue__edit-form ${
          issueEditFormVisibility ? "block" : "hidden"
        }`}
      >
        <IssueInputForm
          onSubmit={(containerIdx, issueIdx, editedIssue) => {
            setIssueEditFormVisibility(false);
            if (editedIssue !== undefined) {
              props.editIssue(containerIdx, issueIdx, editedIssue);
            }
          }}
          containerIdx={props.containerIdx}
          issueIdx={props.issueIdx}
          issue={{
            type,
            title,
            text,
          }}
        />
      </div>
    </>
  );
}

export default IssueBox;
