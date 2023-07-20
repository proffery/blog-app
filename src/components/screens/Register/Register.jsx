import styles from './Register.module.css'
import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"

const Register = (prop) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const navigate = useNavigate();

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
        if(password !== passwordRepeat) {
            showError('Error: password are not matching')
        }

        else {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // eslint-disable-next-line no-unused-vars
                const user = userCredential.user
                // ...
            })
            .then(navigate('/'))
            
            .catch((error) => {
                const errorCode = error.code
                showError('Error: ' + errorCode)
            })
        }
    }

    const showError = (msg) => {
        prop.showError(msg)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Register</h1>
            <form className={styles.form} onSubmit={registerSubmitHamdle}>
                <div className={styles.group}>
                    <label htmlFor="register-email">E-mail:</label>
                    <input type="text" name="register-email" id="register-email" placeholder='Enter email' value={email} onChange={emailHandle}/>
                </div>
                <div className={styles.group}>
                    <label htmlFor="register-password">Password:</label>
                    <input type="password" name="register-password" id="register-password" placeholder='Enter password' value={password} onChange={passwordHandle}/>
                </div>
                <div className={styles.group}>
                    <label htmlFor="register-password-repeat">Repeat password:</label>
                    <input type="password" name="register-password-repeat" id="register-password-repeat" placeholder='Repeat password' value={passwordRepeat} onChange={passwordRepeatHandle}/>
                </div>
                <div className={styles.group}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register