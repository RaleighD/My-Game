import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_N_T_2mbC0xbVdwNkMsP5YrUrrKnJ3ZM",
    authDomain: "my-game-fb475.firebaseapp.com",
    projectId: "my-game-fb475",
    storageBucket: "my-game-fb475.appspot.com",
    messagingSenderId: "85077094514",
    appId: "1:85077094514:web:3bcc0ae2d3dfc2733092eb",
    measurementId: "G-78Y1MSGKN3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
