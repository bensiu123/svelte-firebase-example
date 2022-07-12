// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore
} from 'firebase/firestore';
import type { Blog } from './types/blog';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA1KyaGHZCYIN1GuvqVe-jGjBSvrf37gPY',
	authDomain: 'svelte-firebase-example.firebaseapp.com',
	projectId: 'svelte-firebase-example',
	storageBucket: 'svelte-firebase-example.appspot.com',
	messagingSenderId: '72686156811',
	appId: '1:72686156811:web:fb15f3233b60a1baf05b0e',
	measurementId: 'G-8G4SBXCH0J'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const db = getFirestore(app);

export const userDoc = (userId: string) => doc(db, 'users', userId);

export const blogCollection = collection(db, 'blogs') as CollectionReference<Blog>;
export const blogDoc = (blogId: string) => doc(db, 'blogs', blogId) as DocumentReference<Blog>;
