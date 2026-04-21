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

// ===== CALCULATOR =====
function calculate(){
 try{
  calcResult.textContent = eval(calcInput.value);
 }catch{
  calcResult.textContent = "Error";
 }
}

// ===== UNIT CONVERTER =====
function convertKM(){
 unitResult.textContent = (kmInput.value * 0.621371).toFixed(2) + " miles";
}

// ===== WEATHER =====
async function getWeather(){
 const city = cityInput.value;
 const res = await fetch(`https://wttr.in/${city}?format=3`);
 const data = await res.text();
 weatherResult.textContent = data;
}

// ===== STOPWATCH =====
let sw=0, swi;
function startSW(){
 swi=setInterval(()=>{
  sw++;
  swText.textContent=sw;
 },1000);
}
function stopSW(){
 clearInterval(swi);
}

// ===== CLIPBOARD =====
function copyText(){
 navigator.clipboard.writeText(clipInput.value);
}

// ===== QR =====
function genQR(){
 qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrInput.value}`;
}

// ===== IP =====
async function getIP(){
 const res = await fetch("https://api.ipify.org?format=json");
 const data = await res.json();
 ipText.textContent = data.ip;
}

// ===== BATTERY =====
async function getBattery(){
 const b = await navigator.getBattery();
 batteryText.textContent = Math.round(b.level*100) + "%";
}

// ===== FULLSCREEN =====
function goFull(){
 document.documentElement.requestFullscreen();
}

// ===== RANDOM =====
function randomNum(){
 randomText.textContent = Math.floor(Math.random()*100)+1;
}

// ===== GOOGLE SEARCH =====
function searchGoogle(){
 const q = document.getElementById("gQuery").value;
 if(!q) return;

 window.open("https://www.google.com/search?q=" + encodeURIComponent(q), "_blank");
}

// PRO CALC
function calcPro(){
 try{ calcProResult.textContent = eval(calcProInput.value); }
 catch{ calcProResult.textContent = "Error"; }
}

// NOTES+
function saveNotesPlus(){
 localStorage.setItem("notesPlus", notesPlusArea.value);
}
notesPlusArea.value = localStorage.getItem("notesPlus")||"";

// DRAW
let ctx = canvas.getContext("2d");
canvas.onmousemove = e=>{
 if(e.buttons) ctx.fillRect(e.offsetX,e.offsetY,2,2);
};

// FILE
function readFile(input){
 const reader=new FileReader();
 reader.onload=e=>fileContent.textContent=e.target.result;
 reader.readAsText(input.files[0]);
}

// TEXT
function toUpper(){ textInput.value=textInput.value.toUpperCase(); }
function toLower(){ textInput.value=textInput.value.toLowerCase(); }

// COUNTER
let c=0;
function countUp(){ c++; countText.textContent=c; }

// PASSWORD
function checkPass(){
 const v=passCheck.value.length;
 passStrength.textContent = v<5?"Weak":v<10?"Medium":"Strong";
}

// UUID
function genUUID(){
 uuidText.textContent = crypto.randomUUID();
}

// MARKDOWN
function renderMD(){
 mdOutput.innerHTML = mdInput.value.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>");
}

// SPEECH
function startSpeech(){
 const rec=new(window.SpeechRecognition||webkitSpeechRecognition)();
 rec.onresult=e=>speechText.textContent=e.results[0][0].transcript;
 rec.start();
}

// TTS
function speak(){
 speechSynthesis.speak(new SpeechSynthesisUtterance(ttsInput.value));
}

// VIBRATE
function vibrate(){ navigator.vibrate(200); }

// FLASH
async function flash(){
 try{ await navigator.mediaDevices.getUserMedia({video:{torch:true}}); }catch{}
}

// DEVICE
function deviceInfo(){
 deviceText.textContent = navigator.userAgent;
}

// ORIENTATION
function getOrientation(){
 oriText.textContent = screen.orientation.type;
}

// STORAGE
function storageInfo(){
 storageText.textContent = localStorage.length + " items stored";
}

// FOCUS
function startFocus(){
 let t=1500;
 const i=setInterval(()=>{
  t--;
  focusText.textContent = Math.floor(t/60)+":"+(t%60).toString().padStart(2,"0");
  if(t<=0){
    clearInterval(i);
    focusText.textContent="Break!";
  }
 },1000);
}

// CLIPBOARD+
function copyPlus(){ navigator.clipboard.writeText(clipPlusInput.value); }
async function pastePlus(){ clipPlusInput.value = await navigator.clipboard.readText(); }

// WORD COUNT
function countWords(){
 const text = wordInput.value.trim();
 const words = text ? text.split(/\s+/).length : 0;
 wordResult.textContent = "Words: "+words+" | Chars: "+text.length;
}

// JSON
function formatJSON(){
 try{
  jsonOutput.textContent = JSON.stringify(JSON.parse(jsonInput.value),null,2);
 }catch{
  jsonOutput.textContent = "Invalid JSON";
 }
}
