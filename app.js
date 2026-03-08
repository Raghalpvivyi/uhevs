import { auth, db } from "./firebase-config.js";
import { ref, set, push, onValue, get } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { signInAnonymously } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// العناصر من HTML
const inputName = document.getElementById("input-name");
const inputRoom = document.getElementById("input-room");
const btnCreate = document.getElementById("btn-create");
const btnJoin = document.getElementById("btn-join");
const playersList = document.getElementById("players-list");
const roomCodeSpan = document.getElementById("room-code-span");
const chatBox = document.getElementById("chat-public");
const chatMsg = document.getElementById("chat-msg");
const sendChat = document.getElementById("send-chat");

// الحالة الحالية
let playerName = "";
let playerId = "";
let roomCode = "";

// تسجيل دخول مجهول
signInAnonymously(auth)
  .then(() => {
    console.log("تم تسجيل الدخول كـ مجهول");
  })
  .catch(err => console.error(err.message));

// توليد كود الغرفة
function generateRoomCode(length = 6){
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for(let i=0;i<length;i++){
    code += chars.charAt(Math.floor(Math.random()*chars.length));
  }
  return code;
}

// تحديث قائمة اللاعبين في الغرفة
function updatePlayersList(){
  if(!roomCode) return;
  const roomRef = ref(db, `rooms/${roomCode}/players`);
  onValue(roomRef, snapshot => {
    playersList.innerHTML = "";
    snapshot.forEach(child => {
      const div = document.createElement("div");
      div.textContent = child.val().name;
      playersList.appendChild(div);
    });
  });
}

// إنشاء غرفة جديدة
btnCreate.addEventListener("click", () => {
  playerName = inputName.value.trim();
  if(!playerName) return alert("اكتب اسمك");
  roomCode = generateRoomCode();
  roomCodeSpan.textContent = roomCode;

  const playerRef = ref(db, `rooms/${roomCode}/players/${auth.currentUser.uid}`);
  set(playerRef, { name: playerName });

  updatePlayersList();
  alert(`تم إنشاء الغرفة! الرمز: ${roomCode}`);
});

// الانضمام لغرفة موجودة
btnJoin.addEventListener("click", () => {
  playerName = inputName.value.trim();
  if(!playerName) return alert("اكتب اسمك");
  const code = inputRoom.value.trim().toUpperCase();
  if(!code) return alert("اكتب رمز الغرفة");

  const roomRef = ref(db, `rooms/${code}`);
  get(roomRef).then(snapshot => {
    if(snapshot.exists()){
      roomCode = code;
      roomCodeSpan.textContent = roomCode;
      const playerRef = ref(db, `rooms/${roomCode}/players/${auth.currentUser.uid}`);
      set(playerRef, { name: playerName });
      updatePlayersList();
      alert(`تم الانضمام للغرفة: ${roomCode}`);
    } else {
      alert("الغرفة غير موجودة");
    }
  });
});

// إرسال الرسائل في الدردشة
sendChat.addEventListener("click", () => {
  const msg = chatMsg.value.trim();
  if(!msg || !roomCode) return;
  const chatRef = ref(db, `rooms/${roomCode}/chat`);
  push(chatRef, { sender: playerName, message: msg });
  chatMsg.value = "";
});

// عرض الرسائل اللحظية
function listenChat(){
  if(!roomCode) return;
  const chatRef = ref(db, `rooms/${roomCode}/chat`);
  onValue(chatRef, snapshot => {
    chatBox.innerHTML = "";
    snapshot.forEach(child => {
      const msg = child.val();
      const div = document.createElement("div");
      div.textContent = `${msg.sender}: ${msg.message}`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  });
}

// تحديث القوائم والدردشة تلقائياً بعد الانضمام أو الإنشاء
setTimeout(() => {
  if(roomCode) listenChat();
}, 1000);
