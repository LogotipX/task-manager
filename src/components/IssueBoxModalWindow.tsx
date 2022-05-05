import React, { useState } from "react";

import { Issue } from "../App";

type Props = {
  issue: Issue;
  closeModal(): void;
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
          if (event.target === event.currentTarget) {
            props.closeModal();
          }
        }}
        className="modal-window bg-slate-900 bg-opacity-75 flex flex-col justify-center absolute w-screen h-screen z-50 top-0 left-0"
      >
        <div
          onClickCapture={(event) => {
            // event.stopPropagation();
            console.log(event.target === event.currentTarget);
            if (event.target === event.currentTarget) {
              setIsReductTitle(false);
              setIsReductText(false);
            }
          }}
          className="modal-box bg-slate-700 mx-auto rounded-md w-[90%] h-[75%] text-slate-50 p-5"
        >
          <div className="issue-info grid grid-cols-[2fr,1fr] grid-rows-[35px,2fr,1fr] w-full h-full">
            <div className="issue-info__header col-span-2">header</div>
            <div className="issue-info__main p-2 child:p-2">
              {isReductTitle ? (
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
                  className="issue-info__title text-xl rounded-sm cursor-text hover:bg-slate-600"
                >
                  {props.issue.title}
                </div>
              )}
              {isReductText ? (
                <textarea
                  className="bg-slate-500 rounded-sm p-1 mt-2 w-full min-h-[50%] max-h-full resize-none"
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
                  className="issue-info__text cursor-text hover:bg-slate-600 mt-2"
                >
                  {props.issue.text}
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
