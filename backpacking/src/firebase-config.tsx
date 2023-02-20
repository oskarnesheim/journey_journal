import { getFirestore, collection} from '@firebase/firestore'
// Import the functions you need from the SDKs you need
import { initializeApp,  } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBmqL-jYk9c5B4E0PP9W0rM0GLSmEwI4BE',
  authDomain: 'pu-backup-f1029.firebaseapp.com',
  projectId: 'pu-backup-f1029',
  storageBucket: 'pu-backup-f1029.appspot.com',
  messagingSenderId: '695239639433',
  appId: '1:695239639433:web:1d17853bede5ac6c30e158',
  measurementId: 'G-V51K26211Z'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const getCollection = (path:string) => {
  return collection(database,path)
} 

export const firestoreAutoId = (): string => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let autoId = ''

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(
      Math.floor(Math.random() * CHARS.length)
    )
  }
  return autoId
}
