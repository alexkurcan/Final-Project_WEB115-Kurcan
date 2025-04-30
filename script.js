let tasks = [];

function addTask() {
  const name = document.getElementById('taskName').value.trim();
  const priority = document.getElementById('priority').value;
  const isImportant = document.getElementById('important').checked;
  const date = new Date().toLocaleDateString();

  if (!name) {
    alert('Task name cannot be empty.');
    return;
  }

  const task = {
    id: Date.now(),
    name,
    priority,
    isImportant,
    isCompleted: false,
    date
  };

  tasks.push(task);
  console.log(JSON.stringify(tasks));
  renderTasks();
  clearInputs();
}

function renderTasks() {
  const taskManager = document.getElementById('taskmanager');
  taskManager.innerHTML = '';

  tasks.forEach(task => {
    let backgroundColor = task.isImportant ? 'background-color: red;' : 'background-color: white;';
    let taskHTML = `<div class="task${task.isImportant ? ' important' : ''}${task.isCompleted ? ' completed' : ''}" style="${priorityStyle(task.priority)} ${backgroundColor} display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; padding: 10px; margin: 10px auto; width: 80%;">
      <div class="task-info">
        <span>${task.isCompleted ? '<s>' + task.name + '</s>' : task.name}</span><br />
        <span>${task.isCompleted ? '<s>Priority: ' + task.priority + '</s>' : 'Priority: ' + task.priority}</span><br />
        <span>${task.isCompleted ? '<s>' + task.date + '</s>' : task.date}</span>
      </div>
      <div class="task-actions">
        <input type="checkbox" ${task.isCompleted ? 'checked' : ''} onchange="toggleComplete(${task.id})" />
        <label style="text-decoration: ${task.isCompleted ? 'line-through' : 'none'}">Undo</label>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    </div>`;
    taskManager.innerHTML += taskHTML;
  });
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.isCompleted = !task.isCompleted;
    console.log(JSON.stringify(tasks));
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  console.log(JSON.stringify(tasks));
  renderTasks();
}

function priorityStyle(priority) {
  switch (priority) {
    case 'High':
      return 'border-left: 10px solid red;';
    case 'Medium':
      return 'border-left: 10px solid yellow;';
    case 'Low':
      return 'border-left: 10px solid green;';
    default:
      return '';
  }
}

function clearInputs() {
  document.getElementById('taskName').value = '';
  document.getElementById('priority').value = 'High';
  document.getElementById('important').checked = false;
}