type issueArr = {
  type: string;
  title: string;
  text: string;
  className: string;
}[];

const issueArrFromApi: issueArr = [
  {
    type: "Task",
    title: "IssueBox1",
    text: "Refactor IssueBox component: need add functional and interpase",
    // priority: "some priority",
    className: "my-2",
  },
  {
    type: "Task",
    title: "IssueBox2",
    text: "Refactor IssueBox component: need add functional and interpase",
    // priority: "some priority",
    className: "my-2",
  },
  {
    type: "Task",
    title: "IssueBox3",
    text: "Refactor IssueBox component: need add functional and interpase",
    // priority: "some priority",
    className: "my-2",
  },
];

export default issueArrFromApi;
