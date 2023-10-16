import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { LocalStorage } from 'quasar';

const firebaseConfig = {
  apiKey: 'AIzaSyBsy9pauPRldD_azUwbYB4RhuX0OecpU7k',
  authDomain: 'onur-kol-web.firebaseapp.com',
  projectId: 'onur-kol-web',
  storageBucket: 'onur-kol-web.appspot.com',
  messagingSenderId: '181581658950',
  appId: '1:181581658950:web:8f03c7333628b340704347',
  measurementId: 'G-S445Z5ZBSG',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    LocalStorage.set('user', user);
  } else {
    LocalStorage.remove('user');
  }
});

export { firebaseApp, firebaseAuth, firebaseFirestore };
