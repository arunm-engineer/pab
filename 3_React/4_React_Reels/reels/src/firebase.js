import firebase from 'firebase/app';
import 'firebase/auth';
let authObj = require('./secrets');
firebase.initializeApp(authObj);
let auth = firebase.auth();
export default auth;