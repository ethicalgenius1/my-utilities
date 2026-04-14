/* script.js */
function openTool(id) {
  document.querySelectorAll('.tool').forEach(t => t.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// Notes
function saveNotes() {
  localStorage.setItem('notes', document.getElementById('notesArea').value);
}

window.onload = () => {
  document.getElementById('notesArea').value = localStorage.getItem('notes') || '';
  loadTodos();
};

// Todo
function addTodo() {
  const input = document.getElementById('todoInput');
  const list = document.getElementById('todoList');

  if (!input.value) return;

  const li = document.createElement('li');
  li.textContent = input.value;
  li.onclick = () => {
    li.remove();
    saveTodos();
  };

  list.appendChild(li);
  input.value = '';
  saveTodos();
}

function saveTodos() {
  const items = [];
  document.querySelectorAll('#todoList li').forEach(li => items.push(li.textContent));
  localStorage.setItem('todos', JSON.stringify(items));
}

function loadTodos() {
  const items = JSON.parse(localStorage.getItem('todos') || '[]');
  const list = document.getElementById('todoList');

  items.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    li.onclick = () => {
      li.remove();
      saveTodos();
    };
    list.appendChild(li);
  });
}

