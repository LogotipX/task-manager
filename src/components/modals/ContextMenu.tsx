import React, { useEffect, useRef } from "react";
import Button from "../Button";

type Props = {
  onCancel?(): void;
  onDelete?(): void;
  onEdit?(): void;
  onBlur?(): void;
};

export default function ContextMenu(props: Props) {
  const focusOnContextMenu = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!props.onBlur) return;

    window.addEventListener("click", contextMenuOnBlurCallBack);

    return () => {
      window.removeEventListener("click", contextMenuOnBlurCallBack);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function contextMenuOnBlurCallBack(clickEvent: MouseEvent) {
    if (!props.onBlur) return;

    const coords = focusOnContextMenu.current?.getBoundingClientRect();

    if (
      clickEvent.offsetX !== coords?.left ||
      clickEvent.offsetY !== coords?.top
    ) {
      props.onBlur();
    }
  }

  return (
    <div
      ref={focusOnContextMenu}
      onClick={(event) => event.stopPropagation()}
      className={`issue-context-menu w-full min-w-max h-fit bg-slate-700 border-2 rounded-sm border-slate-400 text-center`}
    >
      <div className="settings-container flex flex-col justify-between w-full h-fit">
        {props.onEdit ? (
          <Button clickHandler={props.onEdit}>
            <span className="text-slate-50 w-full">Edit</span>
          </Button>
        ) : null}
        {props.onCancel ? (
          <Button clickHandler={props.onCancel}>
            <span className="text-slate-50 w-full">Cancel</span>
          </Button>
        ) : null}
        {props.onDelete ? (
          <Button clickHandler={props.onDelete}>
            <span className="text-red-500 w-full">Delete</span>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
