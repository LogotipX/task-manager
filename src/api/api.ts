import { TasksContainerArr } from "./types";

const getIssues: Promise<TasksContainerArr> = new Promise(
  (resolve, reject): void => {
    setTimeout(() => {
      resolve(TasksContainersFromApi);
    }, 850);
  }
);

const TasksContainersFromApi: TasksContainerArr = [
  {
    owner: "",
    taskContainerName: "to do",
    issues: [
      {
        owner: "",
        type: "Task",
        title: "IssueBox1",
        text: "Refactor IssueBox component: need add functional and interpase",
        checked: false,
        // priority: "some priority",
      },
      {
        owner: "",
        type: "Task",
        title: "IssueBox2",
        text: "Refactor IssueBox component: need add functional and interpase",
        checked: false,
        // priority: "some priority",
      },
      {
        owner: "",
        type: "Task",
        title: "IssueBox3",
        text: "Refactor IssueBox component: need add functional and interpase",
        checked: false,
        // priority: "some priority",
      },
      // {
      //   type: "Task",
      //   title: "IssueBox4",
      //   text: "Refactor IssueBox component: need add functional and interpase",
      // checked: false,
      //   // priority: "some priority",
      // },
    ],
  },
  {
    owner: "",
    taskContainerName: "to do",
    issues: [
      {
        owner: "",
        type: "Task",
        title: "IssueBox1",
        text: "Refactor IssueBox component: need add functional and interpase",
        checked: false,
        // priority: "some priority",
      },
      {
        owner: "",
        type: "Task",
        title: "IssueBox2",
        text: "Refactor IssueBox component: need add functional and interpase",
        checked: false,
        // priority: "some priority",
      },
      {
        owner: "",
        type: "Task",
        title: "IssueBox3",
        text: "Refactor IssueBox component: need add functional and interpase",
        checked: false,
        // priority: "some priority",
      },
      // {
      //   type: "Task",
      //   title: "IssueBox4",
      //   text: "Refactor IssueBox component: need add functional and interpase",
      // checked: false,
      //   // priority: "some priority",
      // },
    ],
  },
  {
    owner: "",
    taskContainerName: "to do",
    issues: [
      {
        owner: "",
        type: "Task",
        title: "IssueBox1",
        text: "Refactor IssueBox component: need add functional and interpase",
        checked: false,
        // priority: "some priority",
      },
      {
        owner: "",
        type: "Task",
        title: "IssueBox2",
        text: "Refactor IssueBox component: need add functional and interpase",
        checked: false,
        // priority: "some priority",
      },
      {
        owner: "",
        type: "Task",
        title: "IssueBox3",
        text: "Refactor IssueBox component: need add functional and interpase",
        checked: false,
        // priority: "some priority",
      },
      // {
      //   type: "Task",
      //   title: "IssueBox4",
      //   text: "Refactor IssueBox component: need add functional and interpase",
      // checked: false,
      //   // priority: "some priority",
      // },
    ],
  },
];

export default getIssues;
