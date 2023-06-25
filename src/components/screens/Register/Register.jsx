import styles from './Register.module.css'
import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    const emailHandle = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const passwordHandle = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const passwordRepeatHandle = (e) => {
        e.preventDefault()
        setPasswordRepeat(e.target.value)
    }

    const registerSubmitHamdle = (e) => {
        e.preventDefault()
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user
            // ...
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            // ..
        })
    }

    return (
        <div className={styles.container}>
            <form onSubmit={registerSubmitHamdle}>
                <div className={styles.group}>
                    <label htmlFor="register-email">E-mail:</label>
                    <input type="text" name="register-email" id="register-email" value={email} onChange={emailHandle}/>
                </div>
                <div className={styles.group}>
                    <label htmlFor="register-password">Password:</label>
                    <input type="password" name="register-password" id="register-password" value={password} onChange={passwordHandle}/>
                </div>
                <div className={styles.group}>
                    <label htmlFor="register-password-repeat">Repeat password:</label>
                    <input type="password" name="register-password-repeat" id="register-password-repeat" value={passwordRepeat} onChange={passwordRepeatHandle}/>
                </div>
                <div className={styles.group}>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register