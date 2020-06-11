import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAPHa73fpq3nO4pD_1h0Y4f80D_RJFeEtA",
    authDomain: "fast-food-now.firebaseapp.com",
    databaseURL: "https://fast-food-now.firebaseio.com",
    projectId: "fast-food-now",
    storageBucket: "fast-food-now.appspot.com",
    messagingSenderId: "172055195715",
    appId: "1:172055195715:web:4bab9f9147993fb63f64f6"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export const firebaseAuth = firebase.auth();
export const dbMenuRef = db.collection('menu');
export const dbOrdersRef = db.collection('orders');