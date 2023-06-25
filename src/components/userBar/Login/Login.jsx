import { useState, useEffect } from "react"
import styles from './Login.module.css'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'



const Login = (prop) => {
  const [signInStatus, setSignInStatus] = useState(prop.prop === null ? false : true)

  useEffect(() => {
    prop.authStateChanged()
  }, [signInStatus])

  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
      .then(setSignInStatus(!!getAuth().currentUser))
  }

  const loginWithEmailAndPassword = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={loginWithEmailAndPassword}>
        <div className={styles.group}>
          <label htmlFor="login-username">Username:</label>
          <input type="text" id="login-username" name="login-username"/>
        </div>
        <div className={styles.group}>
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" name="login-password" />
        </div>
        <div className={styles.group}>
          <button type="submit">Log in</button>
        </div>
      </form>
      <button onClick={signIn}>Log in Google</button>
    </div>
  )
}

export default Login