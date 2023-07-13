import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app';

const config = {
    apiKey: "AIzaSyB6qIEuWw3eSvsyz-6Qv_gZPYaULQiNN-s",
    authDomain: "blog-app-d8e51.firebaseapp.com",
    projectId: "blog-app-d8e51",
    storageBucket: "blog-app-d8e51.appspot.com",
    messagingSenderId: "670450823695",
    appId: "1:670450823695:web:79be28d9554b21e93ae97a",
    measurementId: "G-Z9MXS4C96M"
  };

  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
  }
  const app = initializeApp(config)
  export const storage = getStorage(app)