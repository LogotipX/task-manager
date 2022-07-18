import React from "react";

type Props = {
  title: string;
  setTitle(title: string): void;
  enterKeyPressHandler(event: React.KeyboardEvent): void;
}

export default function OneLineInput(props: Props) {
  return (
    <input
      className="bg-slate-500 rounded-sm p-1 w-full"
      type="text"
      autoFocus
      placeholder="Issue title"
      value={props.title}
      maxLength={64}
      onChange={(input) => props.setTitle(input.target.value)}
      onKeyDown={props.enterKeyPressHandler}
    />
  );
}
