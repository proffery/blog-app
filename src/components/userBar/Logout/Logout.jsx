import styles from './Logout.module.css'
import { useState, useEffect } from 'react'
import {
    getAuth,
    signOut,
} from 'firebase/auth'

const Logout = (prop) => {

    const [signInStatus, setSignInStatus] = useState(prop.prop === null ? false : !!prop.prop.auth.currentUser)

    useEffect(() => {
        prop.authStateChanged()
    }, [signInStatus])

    function getUserName() {
        // Return the user's display name.
        return getAuth().currentUser.displayName;
    }

    async function signOutUser() {
        // Sign out of Firebase.
        await signOut(getAuth())
        .then(setSignInStatus(!!getAuth().currentUser))
    }

    function getProfilePicUrl() {
        // Return the user's profile pic URL.
        return getAuth().currentUser.photoURL ||'/assets/img/category/default-category.svg';
    }

    return (
        <div className={styles.userContainer}>
              <div className={styles.userInfo}>Logged in as:
                <img className={styles.userImg} src={getProfilePicUrl()} alt='User photo' />
                <div className={styles.userName}>{getUserName()}</div>
                <button onClick={signOutUser}>Exit</button>
              </div>
        </div>
    )
}

export default Logout