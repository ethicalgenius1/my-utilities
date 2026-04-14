function openTool(id){
 return random([
  'Interesting... tell me more.',
  'Why do you think that?',
  'That sounds important.',
  'I see 👀'
 ]);
}

function random(arr){
 return arr[Math.floor(Math.random()*arr.length)];
}

// ===== NOTES =====
function saveNotes(){
 localStorage.setItem('notes',document.getElementById('notesArea').value);
}

// ===== TODO =====
function addTodo(){
 const input=document.getElementById('todoInput');
 const list=document.getElementById('todoList');
 if(!input.value) return;
 const li=document.createElement('li');
 li.textContent=input.value;
 li.onclick=()=>{li.remove(); saveTodos();};
 list.appendChild(li);
 input.value='';
 saveTodos();
}

function saveTodos(){
 const items=[];
 document.querySelectorAll('#todoList li').forEach(li=>items.push(li.textContent));
 localStorage.setItem('todos',JSON.stringify(items));
}

function loadTodos(){
 const items=JSON.parse(localStorage.getItem('todos')||'[]');
 const list=document.getElementById('todoList');
 items.forEach(t=>{
  const li=document.createElement('li');
  li.textContent=t;
  li.onclick=()=>{li.remove(); saveTodos();};
  list.appendChild(li);
 });
}

// ===== GAME =====
let secret=Math.floor(Math.random()*10)+1;
function guessNumber(){
 const guess=document.getElementById('guessInput').value;
 const result=document.getElementById('gameResult');
 if(guess==secret){
  result.textContent='Correct! 🎉';
  secret=Math.floor(Math.random()*10)+1;
 } else {
  result.textContent='Wrong, try again!';
 }
}

// ===== SEARCH =====
const search=document.getElementById('search');
search.addEventListener('input',()=>{
 const val=search.value.toLowerCase();
 document.querySelectorAll('main button').forEach(btn=>{
  btn.style.display=btn.textContent.toLowerCase().includes(val)?'block':'none';
 });
});

// ===== LOAD =====
window.onload=()=>{
 document.getElementById('notesArea').value=localStorage.getItem('notes')||'';
 loadTodos();
};
