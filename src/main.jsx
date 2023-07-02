import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import UserBar from './components/userBar/UserBar/UserBar.jsx'
import { getFirebaseConfig } from '../src/Firebase/config'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore'

function initFirebaseAuth() {
  // Subscribe to the user's signed-in status
  onAuthStateChanged(getAuth(), authStateObserver);
}

const authStateChanged = () => {
  authStateObserver
}

async function authStateObserver(user) {
  const loadedData = await loadData()
  let currentUser
  if (user) {
    currentUser = user
  }
  
  else {
    currentUser = null
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <UserBar user={currentUser} posts={loadedData} authStateChanged={authStateChanged}/>
    </React.StrictMode>
  )
}


async function loadData() {
  let loadedData = []
  const q = query(collection(getFirestore(), 'posts'), orderBy('timestamp', 'desc'), limit(12))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    loadedData.push(doc.data())
  })
  return loadedData
}

const firebaseAppConfig = getFirebaseConfig()
initializeApp(firebaseAppConfig)
initFirebaseAuth()
