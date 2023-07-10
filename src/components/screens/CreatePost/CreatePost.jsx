import styles from './CreatePost.module.css'
import { useState } from 'react'
import uniqid from 'uniqid'
import { useNavigate } from "react-router-dom"
import {
    getAuth
} from 'firebase/auth'
import {
    getFirestore,
    serverTimestamp,
    setDoc,
    doc,
} from 'firebase/firestore'

const CreatePost = (prop) => {
    // eslint-disable-next-line no-unused-vars
    const [author, setAuthor] = useState(prop.user.email)
    const [title, setTitle] = useState('')
    const [post, setPost] = useState('')
    const navigate = useNavigate();

    const createPost = (e) => {
        e.preventDefault()
        savePost(author ,title, post)
        prop.refreshPage()
    }

    const handleTitle = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const handlePost = (e) => {
        e.preventDefault()
        setPost(e.target.value)
    }
    
    function getProfilePicUrl() {
        // Return the user's profile pic URL.
        return getAuth().currentUser.photoURL ||'/img/account-outline.svg'
    }

    async function savePost(authorName, titleText, postText) {
        const id = uniqid()
        //Push a new post to Cloud Firestore.
        try {
          await setDoc(doc(getFirestore(), 'posts', id), {
            author: authorName,
            title: titleText,
            text: postText,
            profilePicUrl: getProfilePicUrl(),
            timestamp: serverTimestamp(),
            id: id
          }).then(navigate('/'))
        }
        catch(error) {
            prop.showError(error)
            console.error('Error writing new post to Firebase Database', error)
        }
    }

    return (
        <div className={styles.container}>
            <h1>New post:</h1>
            <form onSubmit={createPost}>
                <div className={styles.group}>
                    <label htmlFor="author">Author:</label>
                    <input type="text" name="create-title" className={styles.author} id="author" placeholder={author} readOnly/>
                </div>

                <div className={styles.group}>
                    <label htmlFor="create-title">Title:</label>
                    <input type="text" name="create-title" className={styles.title} id="create-title" placeholder='Title' value={title} onChange={handleTitle}/>
                </div>

                <div className={styles.group}>
                    <label htmlFor="create-post">Post:</label>
                    <textarea type='text' className={styles.post} id='create-post' placeholder='Create new post' value={post} onChange={handlePost}/>
                </div>
                <div className={styles.send}>
                    <button type='submit'>Send</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost