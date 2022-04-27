import { useState } from "react";
import SvgDots from "../icons/dots-3";
import Button from "./Button";

type TProps = {
  type: string;
  title: string;
  text: string;
  // priority: string;
  disableDrag(param: boolean): void;
  onClickDots(): void;
};

function IssueBox(props: TProps) {
  const [modalVisibility, setModalVisibility] = useState(false);

  return (
    <div
      className={`issue-box relative rounded-sm bg-slate-700 px-2 py-3 hover:bg-slate-500`}
    >
      <div className="issue-box__header flex justify-between">
        <div className="issue__type text-slate-300">{props.type}</div>
        <div
          onMouseEnter={() => props?.disableDrag(true)}
          onMouseLeave={() => props?.disableDrag(false)}
          className="issue-box__settings"
        >
          <Button clickHandler={() => setModalVisibility(true)}>
            <SvgDots className="fill-slate-50 w-6 z-10" />
          </Button>
          <div
            className={`settings-modal absolute left-0 top-0 w-full h-full bg-slate-700 text-center ${
              modalVisibility ? "visible" : "invisible"
            }`}
          >
            <div className="settings-container flex flex-col justify-between w-full h-full">
              <Button clickHandler={() => setModalVisibility(false)}>
                <span className="text-slate-50">Cancel</span>
              </Button>
              <Button clickHandler={props.onClickDots}>
                <span className="text-red-500">Remove issue</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="task__title pt-1 font-bold text-slate-100 text-base overflow-x-hidden overflow-ellipsis">
        {props.title}
      </div>
      <div className="task__text text-slate-100 break-words">{props.text}</div>
      {/* <div className="task__priority">{props.priority}</div> */}
    </div>
  );
}

export default IssueBox;
