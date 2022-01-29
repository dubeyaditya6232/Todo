import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA7RK4Ax4bN3EVWhQOjzZcOa3iDCIvHsLA",
  authDomain: "todo-c77fd.firebaseapp.com",
  projectId: "todo-c77fd",
  storageBucket: "todo-c77fd.appspot.com",
  messagingSenderId: "1001231317780",
  appId: "1:1001231317780:web:6321dcd5272291961d6001",
  measurementId: "G-EJ60ZX9QSM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

/* export default db; */