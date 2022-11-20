import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA5nhiA8arU71un6pwWYD0WITdqm4bQa6Y",
    authDomain: "bcc-social.firebaseapp.com",
    projectId: "bcc-social",
    storageBucket: "bcc-social.appspot.com",
    messagingSenderId: "685301423520",
    appId: "1:685301423520:web:c87af5e384a6a322b518c5"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    try {
        const authResponse = await signInWithPopup(auth, googleAuthProvider);
        const user = authResponse.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email
        });
    } catch (err) {
        console.error(err);
        alert(err);
    }
}

export async function logout() {
    await signOut(auth);
}
