export type Issue = {
  type: string;
  title: string;
  text: string;
  isFormCreate?: boolean;
};

export type IssueArr = Issue[];

export type TasksContainerArr = {
  taskContainerName: string;
  issues: IssueArr;
}[];

export type IssueWrapperId = {
  containerIdx: number;
  issueIdx: number;
  issue: Issue;
};
