
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
apiKey: "AIzaSyDyj2ybL165K43axbWyBACNtxD9KfPHKfE",
authDomain: "muhaybis-game.firebaseapp.com",
databaseURL: "https://muhaybis-game-default-rtdb.firebaseio.com",
projectId: "muhaybis-game",
storageBucket: "muhaybis-game.firebasestorage.app",
messagingSenderId: "416411883351",
appId: "1:416411883351:web:154c36f7273301615a9012"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {auth, db};
