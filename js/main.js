const taskLists = Array.from(document.querySelectorAll(".task-list"));
const addButtons = Array.from(document.querySelectorAll(".add"));
const tasksContainers = Array.from(
  document.querySelectorAll(".section-container")
);

let currentDragElement = null;

getListsFromLocalStorage();
controlsHandler();
addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const task = addTask();
    button.previousElementSibling.appendChild(task);
    controlsHandler();
    setLocalStorage();
  });
});

function addTask() {
  const task = document.createElement("div");
  task.classList.add(
    "task-item",
    "mb-2",
    "rounded",
    "overflow-hidden",
    "d-flex",
    "align-items-center"
  );
  task.draggable = true;

  const taskName = document.createElement("input");
  taskName.classList.add("border-0", "disabled", "flex-grow-1");
  taskName.type = "text";
  taskName.setAttribute("value", "New Task");
  taskName.addEventListener("blur", () => {
    taskName.classList.add("disabled");
    taskName.setAttribute("value", taskName.value);
  });

  const editButton = document.createElement("button");
  editButton.style.all = "unset";
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square", "edit-button");
  editButton.appendChild(editIcon);
  editButton.addEventListener("click", () => {
    taskName.classList.remove("disabled");
    taskName.focus();
  });

  const delButton = document.createElement("button");
  delButton.style.all = "unset";
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-regular", "fa-trash-can", "delete-button");
  delButton.appendChild(deleteIcon);
  delButton.addEventListener("click", () => {
    task.remove();
    setLocalStorage();
  });

  task.appendChild(taskName);
  task.appendChild(editButton);
  task.appendChild(delButton);
  return task;
}

function setLocalStorage() {
  taskLists.forEach((taskList, index) => {
    window.localStorage.setItem(`list-${index}`, taskList.innerHTML);
  });
}

function getListsFromLocalStorage() {
  taskLists.forEach((taskList, index) => {
    taskList.innerHTML = window.localStorage.getItem(`list-${index}`);
  });
}

function controlsHandler() {
  const editButtons = Array.from(document.querySelectorAll(".edit-button"));
  const deleteButtons = Array.from(document.querySelectorAll(".delete-button"));
  const taskNames = Array.from(document.querySelectorAll("input"));
  const taskItems = Array.from(document.querySelectorAll(".task-item"));
  editButtons.forEach((button) => {
    const taskName = button.parentElement.previousElementSibling;
    button.addEventListener("click", () => {
      taskName.classList.remove("disabled");
      taskName.focus();
    });
  });
  taskNames.forEach((taskName) => {
    taskName.addEventListener("blur", () => {
      taskName.classList.add("disabled");
      taskName.setAttribute("value", taskName.value);
      setLocalStorage();
    });
  });
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      deleteButton.parentElement.parentElement.remove();
      setLocalStorage();
    });
  });
  taskItems.forEach((taskItem) => {
    taskItem.addEventListener("dragstart", function () {
      currentDragElement = taskItem;
    });
  });
  tasksContainers.forEach((container) => {
    container.addEventListener("dragover", function (event) {
      event.preventDefault();
    });
    container.addEventListener("drop", () => {
      let currentList = container.children[1];
      currentList.appendChild(currentDragElement);
      setLocalStorage();
    });
  });
}
