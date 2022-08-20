import { useEffect, useState, useRef, MouseEvent } from "react";
import SvgDots from "../../icons/dots-3";
import Button from "../Button";
import ContextMenu from "../modals/ContextMenu";

import { Issue } from "../../api/types";
import { checkOnClickOverlap } from "../../functions/functions";

type TProps = {
  issue: Issue;
  editIssue(editedIssue: Issue): void;
  removeIssue(): void;
  onClick(): void;
};

function IssueBox(props: TProps) {
  const [type, setType] = useState(props.issue.type);
  const [title, setTitle] = useState(props.issue.title);
  const [text, setText] = useState(props.issue.text);
  const [checked, setChecked] = useState(props.issue.checked);

  useEffect(() => {
    setType(props.issue.type);
    setTitle(props.issue.title);
    setText(props.issue.text);
    setChecked(props.issue.checked);
  }, [props]);

  useEffect(() => {
    const editedIssue = {
      type,
      title,
      text,
      checked,
    };
    props.editIssue(editedIssue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const [issueContextMenuVisibility, setIssueContextMenuVisibility] =
    useState(false);
  const [issueBoxHover, setIssueBoxHover] = useState(false);

  const issueCheckedInput = useRef<HTMLHeadingElement>(null);
  const contextMenuBtn = useRef<HTMLHeadingElement>(null);

  function onClickHandler(e: MouseEvent) {
    if (!checkOnClickContextBtn(e) && !checkOnClickChecked(e)) {
      props.onClick();
    }
  }

  function checkOnClickChecked(e: MouseEvent) {
    return checkOnClickOverlap(e, issueCheckedInput);
  }

  function checkOnClickContextBtn(e: MouseEvent) {
    return checkOnClickOverlap(e, contextMenuBtn);
  }

  return (
    <>
      <div
        className={`issue-box relative rounded-sm overflow-hidden bg-slate-700 px-2 py-3 hover:bg-slate-500`}
        onClick={onClickHandler}
        onMouseEnter={() => setIssueBoxHover(true)}
        onMouseLeave={() => setIssueBoxHover(false)}
      >
        {checked ? (
          <div className="checked-issue-wrapper absolute top-0 left-0 w-full h-full bg-slate-500 opacity-70"></div>
        ) : null}
        <div
          className={`issue-box__settings absolute top-3 right-2 ${
            issueContextMenuVisibility ? "bg-slate-800" : null
          }`}
          onMouseEnter={(event) => event.stopPropagation()}
        >
          {issueBoxHover ? (
            <div ref={contextMenuBtn}>
              <Button
                clickHandler={(event) => {
                  // event?.stopPropagation();
                  setIssueContextMenuVisibility(true);
                }}
              >
                <SvgDots className="fill-slate-50 w-6" />
              </Button>
            </div>
          ) : null}
          {issueContextMenuVisibility ? (
            <div className="absolute right-0 top-8 w-24 z-10">
              <ContextMenu
                onBlur={() => setIssueContextMenuVisibility(false)}
                onEdit={() => {
                  props.onClick();
                  setIssueContextMenuVisibility(false);
                }}
                onCancel={() => setIssueContextMenuVisibility(false)}
                onDelete={props.removeIssue}
              />
            </div>
          ) : null}
        </div>

        <div
          ref={issueCheckedInput}
          className="issue__checked inline-block relative w-5 h-5 mr-1 align-middle z-10"
        >
          <input
            className={`w-full h-full cursor-pointer ${
              // !checked ? "appearance-none border-2 border-slate-400 bg-slate-600" : ""
              // !checked ? "appearance-none border-2 border-slate-600 bg-slate-400" : ""
              // !checked ? "appearance-none bg-slate-400" : ""
              // !checked ? "appearance-none bg-slate-600" : ""
              !checked ? "appearance-none border-2 border-slate-700 bg-slate-800" : ""
            }`}
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </div>
        <div className="issue__type text-slate-300 inline-block align-middle">{type}</div>
        <div className="issue__title pt-1 font-bold text-slate-100 text-base overflow-x-hidden overflow-ellipsis">
          {title}
        </div>
        <div className="issue__text text-slate-100">{text}</div>
        {/* <div className="task__priority">{props.priority}</div> */}
      </div>
    </>
  );
}

export default IssueBox;
