import { useEffect, useState, useRef, MouseEvent } from "react";
import SvgDots from "../../icons/dots-3";
import Button from "../Button";
import ContextMenu from "../modals/ContextMenu";

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
  const [issueBoxHover, setIssueBoxHover] = useState(false);

  const contextMenuBtn = useRef<HTMLHeadingElement>(null);

  function onClickHandler(e: MouseEvent) {
    if (!checkOnClickContextBtn(e)) {
      props.onClick();
    }
  }

  function checkOnClickContextBtn(e: MouseEvent) {
    const clickCoords = {
      x: e.clientX,
      y: e.clientY,
    };

    const contextMenuBtnCoords =
      contextMenuBtn?.current?.getBoundingClientRect();

    const contextMenuBtnSize = {
      width: contextMenuBtn?.current?.offsetWidth || 0,
      height: contextMenuBtn?.current?.offsetHeight || 0,
    };

    return (
      contextMenuBtnCoords?.x !== undefined &&
      contextMenuBtnCoords?.y !== undefined &&
      clickCoords.x >= contextMenuBtnCoords?.x &&
      clickCoords.x <= contextMenuBtnCoords?.x + contextMenuBtnSize.width &&
      clickCoords.y >= contextMenuBtnCoords?.y &&
      clickCoords.y <= contextMenuBtnCoords?.y + contextMenuBtnSize.height
    );
  }

  return (
    <>
      <div
        className={`issue-box relative rounded-sm bg-slate-700 px-2 py-3 hover:bg-slate-500`}
        onClick={onClickHandler}
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

        <div className="issue__type text-slate-300">{type}</div>
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
