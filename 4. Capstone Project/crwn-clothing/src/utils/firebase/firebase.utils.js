import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",

});

export const auth = getAuth();
export const signInWithGooglePopup = async () => await signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = async () => await signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('Done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;

        return acc;
    }, {});

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
