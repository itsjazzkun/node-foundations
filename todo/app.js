const fs = require("fs");
const filepath = "./tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filepath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filepath, dataJSON);
};

const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach((item, index) => console.log(`${index + 1} - ${item.task}`));
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("task added", task);
};

const removeTasks = (index) => {
  const tasks = loadTasks();
  if (Number.isNaN(index) || index < 0 || index >= tasks.length) {
    console.log("invaild index");
    return;
  }
  tasks.splice(index, 1);
  saveTasks(tasks);
  console.log("task removed");
};

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTasks(parseInt(argument));
} else {
  console.log("command does not exists..");
}
