/* style.css */
body {
  margin:0;
  font-family: Arial;
  background: linear-gradient(135deg,#1e1e2f,#121212);
  color:white;
}

header {
  padding:15px;
  background:#00000066;
  backdrop-filter: blur(10px);
}

#search {
  padding:10px;
  width:100%;
  border-radius:10px;
  border:none;
}

main {
  display:grid;
  grid-template-columns: repeat(auto-fit,minmax(140px,1fr));
  gap:15px;
  padding:20px;
}

button {
  padding:15px;
  border:none;
  border-radius:15px;
  background:#ffffff11;
  color:white;
  cursor:pointer;
  transition:0.2s;
}

button:hover {
  background:#ffffff33;
  transform: scale(1.05);
}

.tool {
  padding:20px;
}

.hidden {display:none;}

textarea {width:100%; height:150px;}

#chatBox {
  height:200px;
  overflow:auto;
  background:#00000055;
  padding:10px;
  margin-bottom:10px;
}

.user {color:#4fc3f7;}
.bot {color:#81c784;}
