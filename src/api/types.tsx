export type Issue = {
  owner: string;

  type: string;
  title: string;
  text: string;
  checked: boolean;
  isFormCreate?: boolean;
};

export type IssueArr = Issue[];

export type TasksContainerArr = {
  owner: string;

  taskContainerName: string;
  issues: IssueArr;
}[];

export type IssueWrapperId = {
  containerIdx: number;
  issueIdx: number;
  issue: Issue;
};
