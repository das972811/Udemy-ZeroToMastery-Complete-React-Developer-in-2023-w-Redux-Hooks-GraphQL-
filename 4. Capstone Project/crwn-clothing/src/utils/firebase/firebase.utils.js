import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMr1C-MfMQBTLBC-f14YE54bJAC0RuiEE",
    authDomain: "crown-clothing-db-4e42e.firebaseapp.com",
    projectId: "crown-clothing-db-4e42e",
    storageBucket: "crown-clothing-db-4e42e.appspot.com",
    messagingSenderId: "909596521678",
    appId: "1:909596521678:web:f037f131c179a8aca90c9f"
};

// Initialize Firebase

// const firebaseApp
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",

});

export const auth = getAuth();
export const signInWithGooglePopup = async () => await signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async userAuth => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists())

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};
