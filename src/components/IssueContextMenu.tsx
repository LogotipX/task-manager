import Button from "./Button";

type Props = {
  onCancel(): void;
  removeIssue(): void;
  editIssue(): void;
};

export default function IssueContextMenu(props: Props) {
  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className={`issue-context-menu w-max h-fit bg-slate-700 border-2 rounded-sm border-slate-400 text-center`}
    >
      <div className="settings-container flex flex-col justify-between w-full h-fit">
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
