function openTool(id){
 document.querySelectorAll('.tool').forEach(t=>t.classList.add('hidden'));
 document.getElementById(id).classList.remove('hidden');
}

// AI CHAT (simple fake AI)
function sendMessage(){
 const input=document.getElementById('chatInput');
 const box=document.getElementById('chatBox');
 const msg=input.value.trim();
 if(!msg) return;

 box.innerHTML += `<div class="user">You: ${msg}</div>`;

 let reply = "I don't understand 😅";

 if(msg.includes('hello')) reply = 'Hi there! 👋';
 else if(msg.includes('time')) reply = new Date().toLocaleTimeString();
 else if(msg.includes('date')) reply = new Date().toLocaleDateString();
 else if(msg.includes('name')) reply = 'I am your mini AI 🤖';
 else if(msg.includes('help')) reply = 'Try asking about time, date, or say hello!';

 box.innerHTML += `<div class="bot">Bot: ${reply}</div>`;
 box.scrollTop = box.scrollHeight;
 input.value='';
}

// NOTES
function saveNotes(){
 localStorage.setItem('notes',document.getElementById('notesArea').value);
}

// TODO
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
};
