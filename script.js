function openTool(id){
 document.querySelectorAll('.tool').forEach(t=>t.classList.add('hidden'));
 document.getElementById(id).classList.remove('hidden');
}

// ===== SMARTER AI CHAT =====
const memory = [];

function sendMessage(){
 const input=document.getElementById('chatInput');
 const box=document.getElementById('chatBox');
 const msg=input.value.trim();
 if(!msg) return;

 memory.push({role:'user', content:msg});

 box.innerHTML += `<div class="user">You: ${msg}</div>`;

 const reply = generateAI(msg);

 memory.push({role:'bot', content:reply});

 box.innerHTML += `<div class="bot">Bot: ${reply}</div>`;
 box.scrollTop = box.scrollHeight;
 input.value='';
}

function generateAI(msg){
 msg = msg.toLowerCase();

 // basic intelligence patterns
 if(msg.includes('hello') || msg.includes('hi')) return random([
  'Hey 👋', 'Hello there!', 'Hi 😄'
 ]);

 if(msg.includes('how are you')) return random([
  'I am just code, but I feel awesome 😎',
  'Running perfectly ⚡',
  'All systems good 🤖'
 ]);

 if(msg.includes('time')) return new Date().toLocaleTimeString();
 if(msg.includes('date')) return new Date().toLocaleDateString();

 if(msg.includes('your name')) return 'I am your personal AI assistant 🤖';

 if(msg.includes('who made you')) return 'You did 😎 (well... with a little help)';

 if(msg.includes('help')) return 'Try asking me anything simple. I learn patterns 😉';

 if(msg.includes('bye')) return 'Goodbye! 👋';

 // simple learning memory (very basic)
 const last = memory.slice(-4).map(m=>m.content).join(' ');

 if(msg.includes('remember')){
  localStorage.setItem('ai_memory', msg.replace('remember','').trim());
  return 'Okay, I will remember that 👍';
 }

 if(msg.includes('what did i say')){
  return localStorage.getItem('ai_memory') || 'I don\'t remember anything yet.';
 }

 // fallback smarter response
 return smartReply(msg, last);
}

function smartReply(msg, context){
 if(msg.includes('?')){
  return random([
    'That\'s an interesting question 🤔',
    'I\'m not fully sure, but it sounds important.',
    'Let me think about that...'
  ]);
 }

 if(msg.length < 5) return 'Can you say more?';

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
