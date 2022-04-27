import React from "react";

type BtnProps = {
  clickHandler(): void;
  children?: React.ReactNode;
};

export default function Button(props: BtnProps) {
  return (
    <div
      onClick={props.clickHandler}
      className={`button__create-issue px-1 py-2 font-bold hover:bg-slate-600 active:bg-slate-700 cursor-pointer rounded-sm`}
    >
      {props.children}
    </div>
  );
}
