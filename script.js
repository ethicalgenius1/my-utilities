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
