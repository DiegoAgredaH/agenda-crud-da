import firebase from 'firebase/app';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyA4qk8V38jv8GWvcAReoGIwEuCW9gOR4_M",
    authDomain: "agenda-crud-da.firebaseapp.com",
    projectId: "agenda-crud-da",
    storageBucket: "agenda-crud-da.appspot.com",
    messagingSenderId: "377365768687",
    appId: "1:377365768687:web:2264bea2946251db342e1a"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore(); //db es el objeto para la coneccion a la base de datos.