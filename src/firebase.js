import firebase from "firebase";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAGXx8HWV92HqZeJk6YJxohEhwCon88BZo",
    authDomain: "dragondrop-7bbd2.firebaseapp.com",
    databaseURL: "https://dragondrop-7bbd2.firebaseio.com",
    projectId: "dragondrop-7bbd2",
    storageBucket: "",
    messagingSenderId: "786846701067"
    };

firebase.initializeApp(config);

export default firebase;