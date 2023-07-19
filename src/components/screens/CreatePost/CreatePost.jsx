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
import { storage } from '../../../Firebase/config'
import { listAll, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const CreatePost = (prop) => {
    // eslint-disable-next-line no-unused-vars
    const [author, setAuthor] = useState(prop.user.email)
    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)
    const [post, setPost] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [id, setId] = useState(uniqid())
    const [imageUrl, setImageUrl] = useState('')
    const [imageList, setImageList] = useState([])
    const navigate = useNavigate();
    const imageListRef = ref(storage, `images/${id}/`)
    
    const createPost = (e) => {
        e.preventDefault()
        if (title.length === 0) {
            prop.showError('"Title" can\'t be empty!')
        }
        
        else if (post.length === 0) {
            prop.showError('"Post" can\'t be empty!')
        }

        else {
            savePost(author, title, post)
            prop.refreshPage()
        }
    }

    const handleTitle = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const handlePost = (e) => {
        e.preventDefault()
        setPost(e.target.value)
    }

    const handleUrl = (e) => {
        e.preventDefault()
        setImageUrl(e.target.value)
    }
    
    const handleFile = (e) => {
        e.preventDefault()
        setFile(e.target.files[0])
    }

    function getProfilePicUrl() {
        // Return the user's profile pic URL.
        return getAuth().currentUser.photoURL ||'/img/account-outline.svg'
    }

    async function savePost(authorName, titleText, postText) {
        //Push a new post to Cloud Firestore.
        try {
            await setDoc(doc(getFirestore(), 'posts', id), {
            author: authorName,
            title: titleText,
            text: postText,
            profilePicUrl: getProfilePicUrl(),
            timestamp: serverTimestamp(),
            id: id,
            image_url: imageUrl
            }).then(navigate('/posts/' + id))
        }
        catch(error) {
            prop.showError('Error writing new post to Firebase Database: ' + error)
            console.error('Error writing new post to Firebase Database', error)
        }
    }

    const uploadImage = () => {
        if (file === null) {
            prop.showError('No file chosen!')
            return
        }
        const imageRef = ref(storage, `images/${id}/${id + file.name}`)
        uploadBytes(imageRef, file).then(() => {
            listAll(imageListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setImageList((prev) => [...prev, url])
                    })
                })
            })
        })
        console.log(imageList)
    }

    const onImageFocus = (e) => {
        setImageUrl(e.target.currentSrc)
    }

    return (
        <div className={styles.container}>
            <h1>New post</h1>
            <form className={styles.form} onSubmit={createPost}>
                <div className={styles.group}>
                    <label htmlFor="author">Author:</label>
                    <input type="text" name="create-title" className={styles.author} id="author" placeholder={author} readOnly/>
                </div>

                <div className={styles.group}>
                    <label htmlFor="create-title">*Title:</label>
                    <input type="text" name="create-title" className={styles.title} id="create-title" placeholder='Enter title' value={title} onChange={handleTitle}/>
                </div>

                <div className={styles.group}>
                    <label htmlFor="create-post">*Post:</label>
                    <textarea type='text' className={styles.post} id='create-post' placeholder='Enter post content' value={post} onChange={handlePost}/>
                </div>

                <div className={styles.group}>
                    <label htmlFor="post-image">Post image URL:</label>
                    <textarea type="text" name="post-image" className={styles.title} id="post-image" placeholder='Click on uploaded image for choose' rows={3} value={imageUrl} onChange={handleUrl} readOnly/>
                </div>
                
                <div className={styles.images}>
                    {imageList.map((url) => {
                        return <div className={styles.postImgHolder} tabIndex={0} key={uniqid()}>
                            <img className={styles.postImg} onClick={onImageFocus} src={url}/>
                        </div>
                    })}
                </div>

                <div className={styles.group}>
                    <label htmlFor="upload-file">Image:</label>
                    <input type="file" name="upload-file" className={styles.file} id="upload-file" onChange={handleFile}/>
                    <button className={styles.uploadButton} type='button' onClick={uploadImage}>Upload image</button>
                </div>

                <div className={styles.send}>
                    <button type='submit'>Create post</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost