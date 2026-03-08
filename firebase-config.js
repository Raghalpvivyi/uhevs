
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
apiKey: "PUT_API_KEY",
authDomain: "PUT_DOMAIN",
databaseURL: "PUT_DATABASE_URL",
projectId: "PUT_PROJECT_ID",
storageBucket: "PUT_BUCKET",
messagingSenderId: "PUT_MSG_ID",
appId: "PUT_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {auth, db};
