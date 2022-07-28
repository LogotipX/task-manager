import React, { useState } from "react";
import SvgDots from "../../icons/dots-3";
import Button from "../Button";
import ContextMenu from "../modals/ContextMenu";

type Props = {
  elementsCount?: number;
  containerName: string;
};

export default function TasksContainerHeader(props: Props) {
  const [containerHeaderHover, setContainerHeaderHover] = useState(false);
  const [contextMenuVisibility, setContextMenuVisibility] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setContainerHeaderHover(true)}
        onMouseLeave={() => setContainerHeaderHover(false)}
        className="container__name h-[46px] flex uppercase py-2"
      >
        <span className="children-counter self-center px-2 py-1 rounded-sm bg-slate-900">
          {props.elementsCount}
        </span>
        <div className="container-name self-center w-full pl-1 hover:bg-slate-700 hover:cursor-text">
          {props.containerName}
        </div>
        {containerHeaderHover ? (
          <span className="inline-block float-right">
            <Button
              clickHandler={(event) => {
                event?.stopPropagation();
                setContextMenuVisibility(!contextMenuVisibility);
              }}
            >
              <SvgDots className="fill-slate-50 w-6 z-10" />
            </Button>
          </span>
        ) : null}
      </div>
      {contextMenuVisibility ? (
        <div className="absolute right-0 top-8 z-10">
          <ContextMenu
            editIssue={() => {
              console.log("edit");
            }}
            onCancel={() => setContextMenuVisibility(false)}
            removeIssue={() => console.log("removeIssue")}
          />
        </div>
      ) : null}
    </>
  );
}