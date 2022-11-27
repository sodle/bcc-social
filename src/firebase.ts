import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, User,} from "firebase/auth";
import {doc, getFirestore, setDoc} from "firebase/firestore";

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
const gitHubAuthProvider = new GithubAuthProvider();

export async function signInWithGoogle() {
    try {
        const authResponse = await signInWithPopup(auth, googleAuthProvider);
        const user = authResponse.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
            verified: user.emailVerified
        });
    } catch (err) {
        console.error(err);
        alert(err);
    }
}

export async function signInWithGitHub() {
    try {
        const authResponse = await signInWithPopup(auth, gitHubAuthProvider);
        const user = authResponse.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "github",
            email: user.email,
            verified: user.emailVerified
        });
    } catch (err) {
        console.error(err);
        alert(err);
    }
}

export function mentionUser(user: User): string {
    let emailRendered = user.emailVerified ?
        `(${user.email} ✅)` :
        `(${user.email})`;
    return `${user.displayName} ${emailRendered}`;
}