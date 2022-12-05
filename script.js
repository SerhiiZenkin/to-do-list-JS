let taskNameInput = document.querySelector("#task-name-input");
let addTaskButton = document.querySelector("#add-task-btn");
let startMessage = document.querySelector("#start-message");
let taskList = document.querySelector(".task-list");

let showAll = document
  .querySelector("#showAll-btn")
  .addEventListener("click", showAllTasks);
let showUncompleted = document
  .querySelector("#showUncompleted-btn")
  .addEventListener("click", showUncompletedTasks);
let showCompleted = document
  .querySelector("#showCompleted-btn")
  .addEventListener("click", showCompletedTasks);
let tasks = [];

addTaskButton.addEventListener("click", addTaskHandler);

taskNameInput.addEventListener("keydown", function (e) {
  if (e.code == "Enter") addTaskHandler();
});

function addTaskHandler() {
  if (taskNameInput.value) {
    if (!startMessage.hidden) startMessage.hidden = true;

    let newTask = new Task(taskNameInput.value);
    newTask.createIn(taskList);
    tasks.push(newTask);

    taskNameInput.value = "";
  } else {
    alert("Please add a text of the task");
  }
}

function showAllTasks() {
  tasks.forEach((key) => {
    if (key["isDone"] == true || key["isDone"] == false) {
      key.div.classList.remove("hidden");
    }
  });
}

function showCompletedTasks() {
  tasks.forEach((key) => {
    if (key["isDone"] == true) {
      key.div.classList.remove("hidden");
    }
    if (key["isDone"] == false) {
      key.div.classList.add("hidden");
    }
  });
}

function showUncompletedTasks() {
  tasks.forEach((key) => {
    if (key["isDone"] == false) {
      key.div.classList.remove("hidden");
    }
    if (key["isDone"] == true) {
      key.div.classList.add("hidden");
    }
  });
}

class Task {
  constructor(text) {
    this.text = text;
    this.isDone = false;
    this.div = null;
  }

  createIn(element) {
    this.div = document.createElement("div");
    this.div.classList.add("task");

    let randomNumber = Math.floor(Math.random() * 10000001);

    let input = document.createElement("input");
    input.addEventListener("click", () => this.changeState(this.div));
    input.type = "checkbox";
    input.setAttribute("id", `paragraph+${randomNumber}`);

    let label = document.createElement("label");
    label.setAttribute("for", `paragraph+${randomNumber}`);

    let p = document.createElement("p");
    p.innerText = this.text;

    label.append(p);

    let span = document.createElement("span");
    span.addEventListener("click", function eraser() {
      let result = confirm(
        "Do you confirm the deletion process? You won`t be able to restore the task"
      );
      if (result) {
        this.parentElement.remove();
      }
    });

    this.div.append(input);
    this.div.append(label);
    this.div.append(span);
    element.append(this.div);
  }

  changeState(element) {
    this.isDone = !this.isDone;
    element.classList.toggle("completed");
  }
}

function showTime() {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;

  let genericTime = h + ":" + m + ":" + s + " ";

  document.querySelector("#time").innerHTML = genericTime;

  setTimeout(showTime, 1000);
}

showTime();
