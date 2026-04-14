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

// ===== AI =====
function sendMessage(){
 const input=document.getElementById('chatInput');
 const box=document.getElementById('chatBox');
 const msg=input.value.toLowerCase();

 box.innerHTML += "You: " + msg + "<br>";

 let reply="I don't understand 😅";

 if(msg.includes("hello")) reply="Hi 👋";
 else if(msg.includes("time")) reply=new Date().toLocaleTimeString();
 else if(msg.includes("date")) reply=new Date().toLocaleDateString();
 else if(msg.includes("name")) reply="I'm your AI 🤖";

 box.innerHTML += "Bot: " + reply + "<br>";
 input.value="";
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
