import React from "react";

type Props = {
  value: string;
  setValue(title: string): void;
  enterKeyPressHandler(event: React.KeyboardEvent): void;
  onFocusOut?(): void;
};

export default function OneLineInput(props: Props) {
  return (
    <input
      className="bg-slate-500 rounded-sm p-1 w-full"
      id="OneLineInput"
      type="text"
      autoFocus
      placeholder="Issue title"
      value={props.value}
      maxLength={64}
      onChange={(input) => props.setValue(input.target.value)}
      onKeyDown={props.enterKeyPressHandler}
      onBlur={props.onFocusOut}
    />
  );
}
