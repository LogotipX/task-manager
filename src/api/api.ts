type issueArr = {
  taskContainerName: string;
  issues: {
    type: string;
    title: string;
    text: string;
  }[];
}[];

const getIssues: Promise<issueArr> = new Promise((resolve, reject): void => {
  setTimeout(() => {
    resolve(issueArrFromApi);
  }, 850);
});

const issueArrFromApi: issueArr = [
  {
    taskContainerName: "to do",
    issues: [
      {
        type: "Task",
        title: "IssueBox1",
        text: "Refactor IssueBox component: need add functional and interpase",
        // priority: "some priority",
      },
      {
        type: "Task",
        title: "IssueBox2",
        text: "Refactor IssueBox component: need add functional and interpase",
        // priority: "some priority",
      },
      {
        type: "Task",
        title: "IssueBox3",
        text: "Refactor IssueBox component: need add functional and interpase",
        // priority: "some priority",
      },
      // {
      //   type: "Task",
      //   title: "IssueBox4",
      //   text: "Refactor IssueBox component: need add functional and interpase",
      //   // priority: "some priority",
      // },
    ],
  },
  {
    taskContainerName: "to do",
    issues: [
      {
        type: "Task",
        title: "IssueBox1",
        text: "Refactor IssueBox component: need add functional and interpase",
        // priority: "some priority",
      },
      {
        type: "Task",
        title: "IssueBox2",
        text: "Refactor IssueBox component: need add functional and interpase",
        // priority: "some priority",
      },
      {
        type: "Task",
        title: "IssueBox3",
        text: "Refactor IssueBox component: need add functional and interpase",
        // priority: "some priority",
      },
    ],
  },
];

export default getIssues;
