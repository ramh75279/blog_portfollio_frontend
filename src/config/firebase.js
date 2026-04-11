import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBi1BTkCekXFzhirkY9A75WwdM5dhGWwzw",
  authDomain: "blog-app-emc-b0950.firebaseapp.com",
  projectId: "blog-app-emc-b0950",
  storageBucket: "blog-app-emc-b0950.firebasestorage.app",
  messagingSenderId: "730755565619",
  appId: "1:730755565619:web:cc098492e35fede9d07b46",
  measurementId: "G-YCFX7LSE2N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth