//import React from 'react'
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
  getDocs,
  deleteDoc,
  doc
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
    // <React.StrictMode>
      <UserBar user={currentUser} posts={loadedData} authStateChanged={authStateChanged} deletePost={deletePost} refreshPage={refreshPage}/>
    // </React.StrictMode>
  )
}

const deletePost = async(id) => {
  console.log(id)
  const db = getFirestore()
  const docRef = doc(db, "posts", id)
  deleteDoc(docRef).then(() => { loadData() })
    .catch(error => { console.log(error) 
  })
}

async function loadData() {
  let loadedData = []
  const q = query(collection(getFirestore(), 'posts'), orderBy('timestamp', 'desc'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    loadedData.push(doc.data())
  })
  return loadedData
}

const refreshPage = () => {
  const timer = setTimeout(() => {
      window.location.reload(true)
    }, 200);
    return () => clearTimeout(timer);
}

const firebaseAppConfig = getFirebaseConfig()
initializeApp(firebaseAppConfig)
initFirebaseAuth()
