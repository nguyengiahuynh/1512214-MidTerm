import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAIIRu8xg6Jl-reewB9IKYk9NPzSz2rZNM",
    authDomain: "react-redux-firebase-1512214.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-1512214.firebaseio.com",
    projectId: "react-redux-firebase-1512214",
    storageBucket: "",
    messagingSenderId: "375933914937"
  };
  
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true});

export default firebase;