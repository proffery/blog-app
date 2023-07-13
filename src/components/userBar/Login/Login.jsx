import styles from './Login.module.css'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
  const navigate = useNavigate();

  useEffect(() => {
    prop.authStateChanged()
  }, [signInStatus])

  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
      .then(setSignInStatus(!!getAuth().currentUser))
      .then(navigate('/'))
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
    navigate('/')
  //   .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user
  //   console.log('Logged as: ' + user.email )
  //   // ...
  // })
  .catch((error) => {
    const errorCode = error.code
    showError('Error: ' + errorCode)
  })
  }

  const showError = (msg) => {
    prop.showError(msg)
  }
  
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={loginWithEmailAndPassword}>
        <div className={styles.direction}>
          <div className={styles.group}>
            <label htmlFor="login-email">E-mail:</label>
            <input type="email" id="login-email" name="login-email" value={email} onChange={emailHandle}/>
          </div>
          <div className={styles.group}>
            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" name="login-password" value={password} onChange={passwordHandle}/>
          </div>
        </div>
        <div className={styles.group}>
          <button type="submit">
            <p className={styles.loginText}>Log in Email</p>
            <img className={styles.loginSymbol} src='/img/at.svg' alt="Log in with email" />
          </button>
        </div>
      </form>
      <div className={styles.group}>
        <button onClick={signIn}>
          <p className={styles.loginText}>Log in Goole</p>
          <img className={styles.loginSymbol} src='/img/google.svg' alt="Log in with google" />
        </button>
      </div>
    </div>
  )
}

export default Login