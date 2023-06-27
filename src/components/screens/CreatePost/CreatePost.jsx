import styles from './CreatePost.module.css'
import { useState } from 'react'

const CreatePost = (user) => {
    // eslint-disable-next-line no-unused-vars
    const [author, setAuthor] = useState(user.user)
    const [title, setTitle] = useState('')
    const [post, setPost] = useState('')

    const createPost = (e) => {
        e.preventDefault()
    }

    const handleTitle = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const handlePost = (e) => {
        e.preventDefault()
        setPost(e.target.value)
    }

    return (
        <div className={styles.container}>
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