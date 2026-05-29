import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFzOWJEVeav_GXCyi9gNLub2Pg-KMKhJ8",
  authDomain: "iot-monitoramento-8e0dd.firebaseapp.com",
  projectId: "iot-monitoramento-8e0dd",
  storageBucket: "iot-monitoramento-8e0dd.firebasestorage.app",
  messagingSenderId: "988007931987",
  appId: "1:988007931987:web:52e19297317651bfd266a6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);