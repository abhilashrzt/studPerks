import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC6nbfySG57rCchsJVljpUAK64EJnDd_MA",
  authDomain: "user-details-1a6cd.firebaseapp.com",
  projectId: "user-details-1a6cd",
  storageBucket: "user-details-1a6cd.appspot.com",
  messagingSenderId: "768382703859",
  appId: "1:768382703859:web:2bec261d76b2d85b8cff86"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firebaseDb = firebase.database();

export {storage, firebaseDb};