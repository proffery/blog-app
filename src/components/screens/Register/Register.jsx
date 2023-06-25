import styles from './Register.module.css'

const Register = () => {
    return (
        <div className={styles.container}>
            <form onSubmit={e => e.preventDefault()}>
                <div className={styles.group}>
                    <label htmlFor="register-username">Username:</label>
                    <input type="text" name="register-username" id="register-username" />
                </div>
                <div className={styles.group}>
                    <label htmlFor="register-password">Password:</label>
                    <input type="password" name="register-password" id="register-password" />
                </div>
                <div className={styles.group}>
                    <label htmlFor="register-password-repeat">Repeat password:</label>
                    <input type="password" name="register-password-repeat" id="register-password-repeat" />
                </div>
                <div className={styles.group}>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register