function openTool(id){
 const allTools = document.querySelectorAll('.tool');
 const selected = document.getElementById(id);

 if(!selected.classList.contains('hidden')){
   selected.classList.add('hidden');
   return;
 }

 allTools.forEach(t=>t.classList.add('hidden'));
 selected.classList.remove('hidden');
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
 localStorage.setItem("notes", notesArea.value);
}
notesArea.value = localStorage.getItem("notes") || "";

// ===== TODO =====
function addTodo(){
 const li=document.createElement("li");
 li.textContent=todoInput.value;
 todoList.appendChild(li);
}

// ===== GAME =====
let clicks=0;
function clickGame(){
 clicks++;
 score.textContent=clicks;
}

// ===== TIMER =====
function startTimer(){
 let t=5;
 const el=timerText;
 const i=setInterval(()=>{
  t--;
  el.textContent=t;
  if(t<=0){
    clearInterval(i);
    el.textContent="Done!";
  }
 },1000);
}

// ===== QUOTES =====
function newQuote(){
 const quotes=["Stay consistent","Small progress daily","Focus wins","Discipline"];
 quoteText.textContent = quotes[Math.floor(Math.random()*quotes.length)];
}

// ===== COLOR =====
function changeColor(c){
 document.body.style.background=c;
}

// ===== CLOCK =====
function updateClock(){
 clockText.textContent=new Date().toLocaleTimeString();
}
setInterval(updateClock,1000);

// ===== PASSWORD =====
function genPass(){
 const chars="abcABC123!@#";
 let pass="";
 for(let i=0;i<10;i++){
  pass+=chars[Math.floor(Math.random()*chars.length)];
 }
 passText.textContent=pass;
}

// ===== SEARCH =====
search.oninput=()=>{
 const v=search.value.toLowerCase();
 document.querySelectorAll("main button").forEach(b=>{
  b.style.display=b.textContent.toLowerCase().includes(v)?"block":"none";
 });
};
