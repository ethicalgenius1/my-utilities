function openApp(id){
let el=document.getElementById(id);
el.style.display="block";
el.style.zIndex=Date.now();
}

function closeApp(id){
document.getElementById(id).style.display="none";
}

function minimizeApp(id){
document.getElementById(id).style.display="none";
}

let current=null,offsetX=0,offsetY=0;
function dragStart(e,el){
current=el;
offsetX=e.clientX-el.offsetLeft;
offsetY=e.clientY-el.offsetTop;
document.onmousemove=drag;
document.onmouseup=()=>current=null;
}
function drag(e){
if(!current)return;
current.style.left=(e.clientX-offsetX)+"px";
current.style.top=(e.clientY-offsetY)+"px";
}

function toggleStart(){
let m=document.getElementById("startMenu");
m.style.display=m.style.display==="block"?"none":"block";
}

setInterval(()=>{
let n=new Date();
document.getElementById("clock").innerText=
n.getHours()+":"+n.getMinutes().toString().padStart(2,"0");
},1000);

// CALC
function calculate(){
try{ calcResult.innerText=eval(calcInput.value); }
catch{ calcResult.innerText="Error"; }
}

// WORD
function countWords(){
let t=wordInput.value.trim();
let w=t? t.split(/\s+/).length:0;
wordResult.innerText="Words: "+w+" | Chars: "+t.length;
}

// WEATHER
async function getWeather(){
let city=cityInput.value;
let res=await fetch(`https://wttr.in/${city}?format=j1`);
let d=await res.json();
let c=d.current_condition[0];
weatherResult.innerHTML=
"Temp: "+c.temp_C+"°C<br>"+
"Condition: "+c.weatherDesc[0].value;
}

// QR
function genQR(){
qrImg.src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+qrInput.value;
}

// DICE / COIN
function rollDice(){diceResult.innerText=Math.ceil(Math.random()*6);}
function flipCoin(){coinResult.innerText=Math.random()<0.5?"Heads":"Tails";}

// COLOR
function genColor(){
let c="#"+Math.floor(Math.random()*16777215).toString(16);
document.body.style.background=c;
colorText.innerText=c;
}
function genGradient(){
let c1="#"+Math.random().toString(16).slice(2,8);
let c2="#"+Math.random().toString(16).slice(2,8);
document.body.style.background=`linear-gradient(${c1},${c2})`;
}

// AGE
function calcAge(){
let b=new Date(birth.value);
let n=new Date();
let y=n.getFullYear()-b.getFullYear();
let m=n.getMonth()-b.getMonth();
let d=n.getDate()-b.getDate();
if(d<0){m--;d+=30;}
if(m<0){y--;m+=12;}
ageResult.innerText=`${y}y ${m}m ${d}d`;
}

// BASE64
function encodeB64(){b64Result.innerText=btoa(b64Input.value);}
function decodeB64(){b64DecodeResult.innerText=atob(b64DecodeInput.value);}

// VAULT
function saveVault(){localStorage.setItem("vault",btoa(vaultData.value));}
function loadVault(){let d=localStorage.getItem("vault");if(d)vaultData.value=atob(d);}

// CODE
function runCode(){
try{codeOutput.innerText=eval(codeInput.value);}
catch(e){codeOutput.innerText=e;}
}

function createApp(id, title, content){
  // window
  let win = document.createElement("div");
  win.className = "window";
  win.id = id;

  win.innerHTML = `
    <div class="titlebar" onmousedown="dragStart(event,this.parentElement)">
      ${title}
      <div>
        <button onclick="minimizeApp('${id}')">-</button>
        <button onclick="closeApp('${id}')">X</button>
      </div>
    </div>
    <div class="content">${content}</div>
  `;

  document.body.appendChild(win);

  // icon
  let icon = document.createElement("div");
  icon.className = "icon";
  icon.innerText = title;
  icon.onclick = () => openApp(id);
  document.getElementById("desktop").appendChild(icon);

  // start menu
  let item = document.createElement("div");
  item.className = "startItem";
  item.innerText = title;
  item.onclick = () => openApp(id);
  document.getElementById("startMenu").appendChild(item);
}

 async function askAI(){
 let msg = aiInput.value;
 let res = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({inputs:msg})
 });
 let data = await res.json();
 aiOutput.innerText = data.generated_text || "No reply";
}

function playYT(){
 let id=yt.value.split("v=")[1];
 player.src="https://www.youtube.com/embed/"+id;
}

async function getVerse(){
 let r = await fetch("https://beta.ourmanna.com/api/v1/get/?format=json");
 let d = await r.json();
 verse.innerText = d.verse.details.text;
}

function genPass(){
 let c="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
 let p="";
 for(let i=0;i<20;i++) p+=c[Math.floor(Math.random()*c.length)];
 passOut.innerText=p;
}

async function getIP(){
 let r = await fetch("https://api.ipify.org?format=json");
 let d = await r.json();
 ipOut.innerText = d.ip;
}

function speakText(){
 let u=new SpeechSynthesisUtterance(ttsText.value);
 speechSynthesis.speak(u);
}

function calcPercent(){
 pOut.innerText=((p1.value/p2.value)*100).toFixed(2)+"%";
}

async function speedTest(){
 let t1=Date.now();
 await fetch("https://speed.hetzner.de/10MB.bin");
 let t2=Date.now();
 speedOut.innerText=(10/((t2-t1)/1000)).toFixed(2)+" MB/s";
}

let opts=[];
function addOpt(){opts.push(opt.value);}
function pick(){decOut.innerText=opts[Math.floor(Math.random()*opts.length)];}

window.onload = function(){

  createApp("ai","🤖 AI Chat",`
    <textarea id="aiInput"></textarea>
    <button onclick="askAI()">Ask</button>
    <div id="aiOutput"></div>
  `);

  createApp("links","🔗 Links",`
<a href="https://google.com" target="_blank">Google</a><br>
<a href="https://youtube.com" target="_blank">YouTube</a>
`);

  createApp("bible","✝️ Daily Quote",`
<button onclick="getVerse()">Get Verse</button>
<div id="verse"></div>
`);

createApp("pass","🔐 Password Gen",`
<button onclick="genPass()">Generate</button>
<div id="passOut"></div>
`);



createApp("ip","🌐 IP Info",`
<button onclick="getIP()">Get IP</button>
<div id="ipOut"></div>
`);



createApp("draw","🎨 Drawing",`
<canvas id="drawCanvas" width="300" height="200" style="border:1px solid"></canvas>
`);

setTimeout(()=>{
 let c = document.getElementById("drawCanvas");
 if(!c) return;
 let ctx = c.getContext("2d");
 let draw=false;
 c.onmousedown=()=>draw=true;
 c.onmouseup=()=>draw=false;
 c.onmousemove=(e)=>{
  if(!draw) return;
  ctx.fillRect(e.offsetX,e.offsetY,3,3);
 };
},500);

createApp("tts","🔊 Speak",`
<input id="ttsText">
<button onclick="speakText()">Speak</button>
`);



createApp("percent","📊 Percent",`
<input id="p1" placeholder="part">
<input id="p2" placeholder="total">
<button onclick="calcPercent()">Calc</button>
<div id="pOut"></div>
`);



createApp("speed","⚡ Speed Test",`
<button onclick="speedTest()">Run</button>
<div id="speedOut"></div>
`);



createApp("decision","🎯 Decide",`
<input id="opt">
<button onclick="addOpt()">Add</button>
<button onclick="pick()">Pick</button>
<div id="decOut"></div>
`);

createApp("music","🎵 Music",`
<input id="yt">
<button onclick="playYT()">Play</button>
<iframe id="player" width="100%" height="200"></iframe>
`);

createApp("wheel","🎡 Wheel",`
<iframe src="https://wheelofnames.com/" width="100%" height="300"></iframe>
`);

createApp("googlepp","🔍 Google++",`
<script async src="https://cse.google.com/cse.js?cx=e0286dc3be5fc40a6"></script>
<div class="gcse-search"></div>
`);

  // add ALL your other createApp() calls here

};
