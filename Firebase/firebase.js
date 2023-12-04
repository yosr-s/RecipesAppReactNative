import { initializeApp } from 'firebase/app';
import { getAuth,onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase } from 'firebase/database';



const firebaseConfig = {
    apiKey: "AIzaSyDm3O4IFYG5epVXr6vgL2N8P7nAxzcgR-M",
    authDomain: "recipes-94e6e.firebaseapp.com",
    projectId: "recipes-94e6e",
    storageBucket: "recipes-94e6e.appspot.com",
    messagingSenderId: "224495978805",
    appId: "1:224495978805:web:153f740c029b5ed506247c",
    measurementId: "G-7C4VH5B2S5"
  };
  
  


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Access authentication methods
const auth = getAuth(app);
const db = getDatabase(app);





export {app,auth,db};