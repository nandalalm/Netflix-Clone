import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut} from "firebase/auth/cordova";
import { 
  addDoc, 
  collection, 
  getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDRAZsaTIMOu8e786XE6P4Uf6MV776FCjA",
  authDomain: "netflix-clone-2fb08.firebaseapp.com",
  projectId: "netflix-clone-2fb08",
  storageBucket: "netflix-clone-2fb08.firebasestorage.app",
  messagingSenderId: "510061845240",
  appId: "1:510061845240:web:66b9c59154a49851d7f90d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

const signup = async (name, email, password)=>{
  try {
    const res =await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'user'),{
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const login = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const logout = ()=>{
  signOut(auth);
}

export {auth, db, login, signup, logout}