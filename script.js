// --- Array to store task objects ---
let tasks = [
  { description: "Buy milk", isCompleted: false },
  { description: "Study", isCompleted: true },
];

// --- Select DOM elements ---
const form = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const todoList = document.querySelector("#todo-list");
const summary = document.querySelector("#summary");
const clearButton = document.querySelector("#clear-completed");

// --- Function to add a new task ---
function addTask(description) {
  if (description.trim() === "") {
    summary.textContent = "Please enter a task!";
    return;
  }

  const newTask = {
    description: description,
    isCompleted: false,
  };

  tasks.push(newTask);
  taskInput.value = ""; // Clear the input field
  displayTasks();
  updateSummary();
}

// --- Function to display tasks in the list ---
function displayTasks() {
  if (tasks.length === 0) {
    todoList.innerHTML = "<li>No tasks available</li>";
    return;
  }

  // Build list items
  todoList.innerHTML = ""; // Clear current list
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement("li");

    // Display description and completion status
    li.innerHTML = `${task.description} (Completed: ${task.isCompleted})`;

    // Add click event to toggle completion
    li.addEventListener("click", function () {
      task.isCompleted = !task.isCompleted;
      displayTasks();
      updateSummary();
    });

    todoList.appendChild(li);
  }
}

// --- Function to update task summary ---
function updateSummary() {
  let completedCount = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].isCompleted) {
      completedCount++;
    }
  }

  summary.innerHTML = `Tasks: ${tasks.length}, Completed: ${completedCount}`;
}

// --- Function to clear completed tasks ---
function clearCompleted() {
  tasks = tasks.filter((task) => !task.isCompleted);
  displayTasks();
  updateSummary();
}

// --- Event listener for form submission ---
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask(taskInput.value);
});

// --- Event listener for clear button ---
clearButton.addEventListener("click", function () {
  clearCompleted();
});

// --- Initial render on page load ---
displayTasks();
updateSummary();
