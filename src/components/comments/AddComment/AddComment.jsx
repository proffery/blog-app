import styles from './AddComment.css?inline'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import {
    getFirestore,
    addDoc,
    serverTimestamp,
    collection
} from 'firebase/firestore'
import {
    getAuth
} from 'firebase/auth'

const AddComment = (prop) => {
    console.log(prop.postData.id)
    const [comment, setComment] = useState('')
    const navigate = useNavigate();
    
    const handleComment = (e) => {
        setComment(e.target.value)
    }

    const addComment = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        saveComment(comment, getAuth().currentUser.email, prop.postData.id)
        prop.refreshPage()
    }

    function getProfilePicUrl() {
        // Return the user's profile pic URL.
        return getAuth().currentUser.photoURL ||'/img/account-outline.svg'
    }

    async function saveComment(comment, author, id) {
        //Push a new comment to Cloud Firestore.
        try {
          await addDoc(collection(getFirestore(), 'comments'), {
            author: author,
            text: comment,
            id: id,
            profilePicUrl: getProfilePicUrl(),
            timestamp: serverTimestamp()
          })
          .then(navigate(`/post/${prop.postData.id}`))
        }
        catch(error) {
            prop.showError(error)
            console.error('Error add comment to Firebase Database', error)
        }
    }
    

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={addComment}>
                <div className={styles.group}>
                    <label htmlFor="create-title">Comment:</label>
                    <textarea type="text" name="create-comment" className={styles.title} id="create-comment" rows={5} placeholder='Add comment' value={comment} onChange={handleComment}/>
                </div>
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export {AddComment}