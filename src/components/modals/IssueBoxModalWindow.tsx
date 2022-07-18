import React, { useState } from "react";

import { Issue } from "../../api/types";

type Props = {
  issue: Issue;
  closeModal(): void;
  containerIdx: number;
  issueIdx: number;
  getUpdatedIssue(
    containerIdx: number,
    issueIdx: number,
    updatedIssue: Issue
  ): void;
};

export default function IssueBoxModalWIndow(props: Props) {
  const [title, setTitle] = useState(props.issue.title);
  const [text, setText] = useState(props.issue.text);

  const [isReductTitle, setIsReductTitle] = useState(false);
  const [isReductText, setIsReductText] = useState(false);

  function keyPressHandler(event: React.KeyboardEvent) {
    if (event.shiftKey && event.key === "Enter") {
      event.currentTarget.nodeValue += `\n`;
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      setIsReductTitle(false);
      setIsReductText(false);
      return;
    }
  }

  return (
    <>
      <div
        onClick={(event) => {
          event.stopPropagation();
          if (title.length === 0 && text.length === 0) {
            return;
          }

          if (event.target === event.currentTarget) {
            props.getUpdatedIssue(props.containerIdx, props.issueIdx, {
              type: "Task",
              title,
              text,
            });
            props.closeModal();
          }
        }}
        className="modal-window bg-slate-900 bg-opacity-75 flex flex-col absolute w-full h-full min-w-screen min-h-screen z-50 top-0 left-0"
      >
        <div
          onClickCapture={(event) => {
            if (
              event.target !== document.querySelector("input") &&
              event.target !== document.querySelector("textarea")
            ) {
              setIsReductTitle(false);
              setIsReductText(false);
            }
          }}
          className="modal-box bg-slate-700 mx-auto rounded-md w-[90%] h-[90%] max-h-[512px] mt-8 text-slate-50 p-5"
        >
          <div className="issue-info grid grid-cols-[2fr,1fr] grid-rows-[minmax(35px,35px),2fr,1fr] w-full h-full max-w-full max-h-full">
            <div className="issue-info__header col-span-2">header</div>
            <div className="issue-info__main p-2 h-fit break-all child:p-2 child:max-h-[208px] child:overflow-auto">
              {isReductTitle || title.length === 0 ? (
                <input
                  className="bg-slate-500 rounded-sm p-1 w-full text-xl"
                  type="text"
                  autoFocus
                  placeholder="Issue title"
                  value={title}
                  maxLength={64}
                  onChange={(input) => setTitle(input.target.value)}
                  onKeyDown={keyPressHandler}
                />
              ) : (
                <div
                  onClick={() => setIsReductTitle(true)}
                  className="issue-info__title text-xl min-h-[44px] rounded-sm cursor-text hover:bg-slate-600"
                >
                  {title}
                </div>
              )}
              {isReductText || text.length === 0 ? (
                <textarea
                  className="bg-slate-500 rounded-sm p-1 mt-2 w-full min-h-full max-h-full resize-none"
                  placeholder="Issue text"
                  required={true}
                  value={text}
                  maxLength={255}
                  onChange={(input) => setText(input.target.value)}
                  onKeyDown={keyPressHandler}
                  autoFocus
                />
              ) : (
                <div
                  onClick={() => setIsReductText(true)}
                  className="issue-info__text overflow-scroll cursor-text hover:bg-slate-600 mt-2"
                >
                  {text}
                </div>
              )}
            </div>
            <div className="issue-info__sidebar row-span-2"></div>
            <div className="issue-info__comments">comments</div>
          </div>
        </div>
      </div>
    </>
  );
}
