import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMMtv-gJjbrTulkFION328xebSPisTAF0",
  authDomain: "dropbox-clone-b2f21.firebaseapp.com",
  projectId: "dropbox-clone-b2f21",
  storageBucket: "dropbox-clone-b2f21.appspot.com",
  messagingSenderId: "429454445059",
  appId: "1:429454445059:web:32ffce4030707c3a729c36",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
