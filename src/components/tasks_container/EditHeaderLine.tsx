import React from "react";
import CancelIcon from "../../icons/CancelIcon";
import ConfirmIcon from "../../icons/ConfirmIcon";
import Button from "../Button";
import OneLineInput from "../OneLineInput";

type Props = {
  value: string;
  setValue(inputValue: string): void;
  onConfirm(): void;
  onCancel(): void;
};

export default function EditHeaderLine(props: Props) {
  function enterKeyPressHandler(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      props.onConfirm();
    }
  }

  return (
    <>
      <OneLineInput
        value={props.value}
        setValue={props.setValue}
        enterKeyPressHandler={enterKeyPressHandler}
        onFocusOut={() => props.onConfirm()}
        className="container__name flex text-lg p-2 outline-none"
      />
      <div className="reduct-btns absolute top-[52px] right-1 z-10 border-2 border-slate-400 rounded-sm bg-slate-700">
        <div className="btn__confirm inline-block">
          <Button clickHandler={() => props.onConfirm()}>
            <ConfirmIcon className="fill-slate-50 w-6 h-4" />
          </Button>
        </div>
        <div className="btn__cancel inline-block">
          <Button clickHandler={() => props.onCancel()}>
            <CancelIcon className="fill-slate-50 w-6 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
