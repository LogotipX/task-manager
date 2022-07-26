import { useEffect, useState } from "react";
import SvgDots from "../../icons/dots-3";
import Button from "../Button";
import IssueInputForm from "./IssueInputForm";
import IssueContextMenu from "./IssueContextMenu";

import { Issue } from "../../api/types";

type TProps = {
  type: string;
  title: string;
  text: string;
  // priority: string;
  editIssue(editedIssue: Issue): void;
  removeIssue(): void;
  onClick(): void;
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
  const [issueBoxHover, setIssueBoxHover] = useState(false);

  return (
    <>
      {issueEditFormVisibility ? (
        <IssueInputForm
          getEditedIssue={(editedIssue) => {
            setIssueEditFormVisibility(false);
            if (editedIssue !== undefined) {
              props.editIssue(editedIssue);
            }
          }}
          issue={{
            type,
            title,
            text,
          }}
        />
      ) : (
        <div
          className={`issue-box relative rounded-sm bg-slate-700 px-2 py-3 hover:bg-slate-500`}
          onClick={props.onClick}
          onDoubleClick={() => setIssueEditFormVisibility(true)}
          onMouseEnter={() => setIssueBoxHover(true)}
          onMouseLeave={() => setIssueBoxHover(false)}
        >
          <div
            className={`issue-box__settings absolute top-3 right-2 ${
              issueContextMenuVisibility ? "bg-slate-800" : null
            }`}
            onMouseEnter={(event) => event.stopPropagation()}
          >
            {issueBoxHover ? (
              <Button
                clickHandler={(event) => {
                  event?.stopPropagation();
                  setIssueContextMenuVisibility(true);
                }}
              >
                <SvgDots className="fill-slate-50 w-6 z-10" />
              </Button>
            ) : null}
            {issueContextMenuVisibility ? (
              <div className="absolute right-0 top-8 z-10">
                <IssueContextMenu
                  editIssue={() => {
                    setIssueEditFormVisibility(true);
                    setIssueContextMenuVisibility(false);
                  }}
                  onCancel={() => setIssueContextMenuVisibility(false)}
                  removeIssue={props.removeIssue}
                />
              </div>
            ) : null}
          </div>

          <div className="issue__type text-slate-300">{type}</div>
          <div className="issue__title pt-1 font-bold text-slate-100 text-base overflow-x-hidden overflow-ellipsis">
            {title}
          </div>
          <div className="issue__text text-slate-100">{text}</div>
          {/* <div className="task__priority">{props.priority}</div> */}
        </div>
      )}
    </>
  );
}

export default IssueBox;
