import styles from './Logout.module.css'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
    getAuth,
    signOut,
} from 'firebase/auth'
import { doc, getDoc, getFirestore} from "firebase/firestore"

const Logout = (prop) => {

    const [signInStatus, setSignInStatus] = useState(prop.prop === null ? false : !!prop.prop.auth.currentUser)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        getAdminEmail().then((email) => {email === getUserEmail() ? setIsAdmin(true) : setIsAdmin(false)})
        prop.authStateChanged()
    }, [signInStatus])

    function getUserEmail() {
        // Return the user's display email.
        return getAuth().currentUser.email
    }

    const getAdminEmail = async() => {    
        return (await getDoc(doc(getFirestore(), 'admin', 'email'))).data().email
      }

    async function signOutUser() {
        // Sign out of Firebase.
        await signOut(getAuth())
        .then(setSignInStatus(!!getAuth().currentUser))
    }

    function getProfilePicUrl() {
        // Return the user's profile pic URL.
        return getAuth().currentUser.photoURL ||'/img/account-outline.svg';
    }

    return (
        <div className={styles.container}>
            <div className={styles.userContainer}>
                <div className={styles.userInfo}>Logged as:
                    <img className={styles.userImg} src={getProfilePicUrl()} alt='User photo' />
                    <div className={styles.userName}>{getUserEmail()}</div>
                    <button onClick={signOutUser}>Exit</button>
                </div>
            </div>
            {isAdmin &&
                <div className={styles.createPost}> 
                    <em>You are logged as administrator. Create new</em>
                    <NavLink to='/newpost'>post</NavLink>
                </div>
            }
        </div>
    )
}

export default Logout