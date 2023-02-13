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
  apiKey: "AIzaSyBeZx1DvAO58tLmI32iBwZyPHtbObV2lbI",
  authDomain: "pu-test-ce296.firebaseapp.com",
  projectId: "pu-test-ce296",
  storageBucket: "pu-test-ce296.appspot.com",
  messagingSenderId: "534756802827",
  appId: "1:534756802827:web:62276a489a5d54763b620e",
  measurementId: "G-MZ7ZZR9V3C"
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

export const getUserProfile = async (userId: string) => {
    console.log(userId)
    const userRef = doc(database, 'users', userId)
    const docSnap = await getDoc(userRef)
    
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}
