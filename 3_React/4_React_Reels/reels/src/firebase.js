import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
let authObj = require('./secrets');
firebase.initializeApp(authObj);
let auth = firebase.auth();

export default auth;
export const firestore = firebase.firestore();
export const database = {
    users: firestore.collection("users"),
    posts: firestore.collection("posts"),
    comments: firestore.collection("comments"),
    getUserTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();