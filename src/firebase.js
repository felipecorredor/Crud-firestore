import firebase from 'firebase/app'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAUhVHzy70wJUaU29d2JSUaFsiS3WaMJc4",
    authDomain: "crud-firestore-d6f04.firebaseapp.com",
    projectId: "crud-firestore-d6f04",
    storageBucket: "crud-firestore-d6f04.appspot.com",
    messagingSenderId: "92280020340",
    appId: "1:92280020340:web:f6c4bd8334d0a1f6dee021"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {firebase}