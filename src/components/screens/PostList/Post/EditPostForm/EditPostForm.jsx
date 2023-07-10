import styles from './EditPostForm.module.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import {
    getFirestore,
    doc,
    updateDoc,
} from 'firebase/firestore'

const EditPostForm = (prop) => {
    //console.log(prop.postData)
    // eslint-disable-next-line no-unused-vars
    const [author, setAuthor] = useState(prop.postData.author)
    const [title, setTitle] = useState(prop.postData.title)
    const [post, setPost] = useState(prop.postData.text)
    const navigate = useNavigate();

    const editPost = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        savePost(author, title, post)
        prop.refreshPage()
    }

    const handleTitle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        setTitle(e.target.value)
    }

    const handlePost = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        setPost(e.target.value)
    }

    const cancelHandle = (e) => {
        e.stopPropagation()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        prop.setPostFormVisibility('none')
    }
    async function savePost(authorName, titleText, postText) {
        const id = prop.postData.id
        //Push a new post to Cloud Firestore.
        try {
          await updateDoc(doc(getFirestore(), 'posts', id), {
            author: authorName,
            title: titleText,
            text: postText,
            id: id
          }).then(navigate('/'))
        }
        catch(error) {
            prop.showError(error)
            console.error('Error editing post to Firebase Database', error)
        }
    }

    return (
        <div className={styles.container} onClick={e => e.stopPropagation()}>
            <h1>Edit post:</h1>
            <h2>{prop.postData.title}</h2>
            <form onSubmit={editPost}>
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
                    <textarea type='text' className={styles.post} id='create-post' rows={5} placeholder='Post content' value={post} onChange={handlePost}/>
                </div>
                <div className={styles.buttons}>
                    <button type='submit'>Send</button>
                    <button type='button' onClick={cancelHandle}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export {EditPostForm}