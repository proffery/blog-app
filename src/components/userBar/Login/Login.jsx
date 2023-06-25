import { useState, useEffect } from "react"
import styles from './Login.module.css'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword
} from 'firebase/auth'



const Login = (prop) => {
  const [signInStatus, setSignInStatus] = useState(prop.prop === null ? false : true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    prop.authStateChanged()
  }, [signInStatus])

  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
      .then(setSignInStatus(!!getAuth().currentUser))
  }

  const emailHandle = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
}

const passwordHandle = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
}

  const loginWithEmailAndPassword = (e) => {
    e.preventDefault()
    const auth = getAuth()
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user
    // ...
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={loginWithEmailAndPassword}>
        <div className={styles.group}>
          <label htmlFor="login-email">E-mail:</label>
          <input type="email" id="login-email" name="login-email" value={email} onChange={emailHandle}/>
        </div>
        <div className={styles.group}>
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" name="login-password" value={password} onChange={passwordHandle}/>
        </div>
        <div className={styles.group}>
          <button type="submit">Log in Email</button>
        </div>
      </form>
      <button onClick={signIn}>Log in Google</button>
    </div>
  )
}

export default Login