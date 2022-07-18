import Button from "../Button";

type Props = {
  onCancel(): void;
  removeIssue(): void;
  editIssue(): void;
};

export default function IssueContextMenu(props: Props) {
  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className={`settings-modal absolute left-0 top-0 w-full h-full bg-slate-700 text-center`}
    >
      <div className="settings-container flex flex-col justify-between w-full h-full">
        <Button clickHandler={props.editIssue}>
          <span className="text-slate-50">Edit</span>
        </Button>
        <Button clickHandler={props.onCancel}>
          <span className="text-slate-50">Cancel</span>
        </Button>
        <Button clickHandler={props.removeIssue}>
          <span className="text-red-500">Remove issue</span>
        </Button>
      </div>
    </div>
  );
}
