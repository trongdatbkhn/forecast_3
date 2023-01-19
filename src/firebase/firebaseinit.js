import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9jG1v1Iqpu_7Phxo-UuKCCL5rBIx2cvw",
  authDomain: "vue-auth-yt2412.firebaseapp.com",
  projectId: "vue-auth-yt2412",
  storageBucket: "vue-auth-yt2412.appspot.com",
  messagingSenderId: "435175263480",
  appId: "1:435175263480:web:89130d2babeaa0d454ff0d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const userInformation = db.collection("userinformation");

export { db, app, auth };
