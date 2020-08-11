import firebase from "firebase";

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCVZDGLd9jl_I6aNkyH2S6rOSeol1iVung",
    authDomain: "insta-gram-56ef1.firebaseapp.com",
    databaseURL: "https://insta-gram-56ef1.firebaseio.com",
    projectId: "insta-gram-56ef1",
    storageBucket: "insta-gram-56ef1.appspot.com",
    messagingSenderId: "1099332335404",
    appId: "1:1099332335404:web:400bfab31dfd4a83e6de89",
    measurementId: "G-JW3VKTMFWZ"
});

export const db = firebaseApp.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

