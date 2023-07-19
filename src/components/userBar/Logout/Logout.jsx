import styles from './Logout.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    getAuth,
    signOut,
} from 'firebase/auth'

//COMMENTED FOR DEMO MODE! uncomment for switch off DEMO!
//import { doc, getDoc, getFirestore} from "firebase/firestore"

const Logout = (prop) => {
    
    const [signInStatus, setSignInStatus] = useState(prop.prop === null ? false : !!prop.prop.auth.currentUser)
    //COMMENTED FOR DEMO MODE! uncomment for switch off DEMO!
    //const [isAdmin, setIsAdmin] = useState(false)
    
    useEffect(() => {
        //COMMENTED FOR DEMO MODE!
        //getAdminEmail().then((email) => {email === getUserEmail() ? setIsAdmin(true) : setIsAdmin(false)})
        prop.authStateChanged()
    }, [signInStatus])
    
    function getUserEmail() {
        return getAuth().currentUser.email
    }
    //COMMENTED FOR DEMO MODE! uncomment for switch off DEMO! Code bellow get admin email from DB.
    // const getAdminEmail = async() => {    
    //     return (await getDoc(doc(getFirestore(), 'admin', 'email'))).data().email
    // }
    
    async function signOutUser() {
        // Sign out of Firebase.
        await signOut(getAuth())
        .then(setSignInStatus(!!getAuth().currentUser))
    }
    
    function getProfilePicUrl() {
        // Return the user's profile pic URL.
        return getAuth().currentUser.photoURL ||'./img/account-outline.svg'
    }


    return (
        <div className={styles.container}>
            <div className={styles.userContainer}>
                <div className={styles.userInfo}>Logged:
                    <img className={styles.userImg} src={getProfilePicUrl()} alt='User avatar' />
                    <div className={styles.userName}>{getUserEmail()}</div>
                    <button onClick={signOutUser}>Exit</button>
                </div>
            </div>
            {/* //COMMENTED FOR DEMO MODE! Del or comment "prop.isAdmin" and uncomment isAdmin for switch off DEMO!*/}
            {prop.isAdmin /*isAdmin*/ &&
                <div className={styles.createPost}>You are logged as administrator. Create new
                    <Link to='/newpost'> post</Link>
                </div>
            }
        </div>
    )
}

export default Logout