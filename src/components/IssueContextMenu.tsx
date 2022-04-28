import Button from "./Button";

type Props = {
  visibility: boolean;
  setVisibility(param: boolean): void;
  removeIssue(): void;
};

export default function IssueContextMenu(props: Props) {
  return (
    <div
      className={`settings-modal absolute left-0 top-0 w-full h-full bg-slate-700 text-center ${
        props.visibility ? "visible" : "invisible"
      }`}
    >
      <div className="settings-container flex flex-col justify-between w-full h-full">
        <Button clickHandler={() => props.setVisibility(false)}>
          <span className="text-slate-50">Cancel</span>
        </Button>
        <Button clickHandler={props.removeIssue}>
          <span className="text-red-500">Remove issue</span>
        </Button>
      </div>
    </div>
  );
}
