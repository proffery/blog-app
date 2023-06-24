import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import UserBar from './user/UserBar/UserBar.jsx'
import { getFirebaseConfig } from '../src/Firebase/config'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'

function initFirebaseAuth() {
  // Subscribe to the user's signed-in status
  onAuthStateChanged(getAuth(), authStateObserver);
}

const authStateChanged = () => {
  authStateObserver
}

async function authStateObserver(user) {
  let currentUser
  if (user) {
    currentUser = user
  }
  
  else {
    currentUser = null
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <UserBar prop={currentUser} authStateChanged={authStateChanged}/>
    </React.StrictMode>
  )
}



const firebaseAppConfig = getFirebaseConfig()
initializeApp(firebaseAppConfig)
initFirebaseAuth()
