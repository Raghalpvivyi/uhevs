
import {auth, db} from './firebase-config.js';
import {signInAnonymously} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {ref,set,push,onChildAdded} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const nameInput = document.getElementById("input-name");
const roomInput = document.getElementById("input-room");
const btnCreate = document.getElementById("btn-create");
const btnJoin = document.getElementById("btn-join");
const chatBox = document.getElementById("chat-public");
const chatMsg = document.getElementById("chat-msg");
const sendChat = document.getElementById("send-chat");

let room=null;
let username=null;

signInAnonymously(auth);

function randomCode(){
return Math.random().toString(36).substring(2,8).toUpperCase();
}

btnCreate.onclick=()=>{
username=nameInput.value;
room=randomCode();
alert("رمز الغرفة: "+room);
}

btnJoin.onclick=()=>{
username=nameInput.value;
room=roomInput.value.toUpperCase();
}

sendChat.onclick=()=>{
const msgRef=push(ref(db,"rooms/"+room+"/chat"));
set(msgRef,{name:username,text:chatMsg.value});
chatMsg.value="";
}

onChildAdded(ref(db,"rooms/"+room+"/chat"),snap=>{
const m=snap.val();
chatBox.innerHTML+=`<div><b>${m.name}</b>: ${m.text}</div>`;
})
