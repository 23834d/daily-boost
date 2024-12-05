// Mood Tracker
let moodStatus = document.getElementById("moodStatus");
let moodLog = [];

function logMood() {
  let mood = prompt("How are you feeling today?");
  if (mood) {
    moodStatus.innerText = `Mood Logged: ${mood}`;
    moodLog.push(mood);
    localStorage.setItem("moodLog", JSON.stringify(moodLog));  // Store mood logs
    updateMoodGraph();
  }
}

function updateMoodGraph() {
  let moodGraph = document.getElementById("moodGraph");
  moodGraph.style.height = `${moodLog.length * 10}px`;  // Simple bar based on mood count
}

// Task List with Priority & Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let tasksList = document.getElementById("tasks");

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let task = taskInput.value.trim();
  
  if (task) {
    let priority = prompt("Enter task priority (low, medium, high):");
    tasks.push({ task, priority: priority || 'medium', completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskInput.value = '';  // Clear input
  }
}

function renderTasks() {
  tasksList.innerHTML = '';
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.task;
    li.style.color = task.priority === 'high' ? 'red' : (task.priority === 'medium' ? 'orange' : 'green');
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleTaskCompletion(index);
    li.appendChild(checkbox);
    tasksList.appendChild(li);
  });
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Focus Timer with Progress Bar & Sounds
let timerDisplay = document.getElementById("timerDisplay");
let timerProgress = document.getElementById("timerProgress");
let timerInterval;
let timeLeft = 25 * 60;

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    alert("Focus session complete! Take a break.");
    let audio = new Audio('timer-end.mp3');
    audio.play();
  } else {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerProgress.value = (1 - timeLeft / (25 * 60)) * 100;
    timeLeft--;
  }
}

// Dark Mode Toggle
let themeToggle = document.getElementById("themeToggle");
themeToggle.onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("dark-mode");
};

// Date/Time Display
function updateDateTime() {
  let dateTime = document.getElementById("dateTime");
  let now = new Date();
  dateTime.innerText = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();
