import styles from './EditPostForm.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import {
    getFirestore,
    doc,
    updateDoc,
} from 'firebase/firestore'
import uniqid from 'uniqid'
import { storage } from '../../../Firebase/config'
import { listAll, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const EditPostForm = (prop) => {
    //console.log(prop.postData)
    // eslint-disable-next-line no-unused-vars
    const [author, setAuthor] = useState(prop.postData.author)
    const [title, setTitle] = useState(prop.postData.title)
    const [post, setPost] = useState(prop.postData.text)
    const [imageUrl, setImageUrl] = useState(prop.postData.image_url)
    const [imageList, setImageList] = useState([])
    const [file, setFile] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [id, setId] = useState(prop.postData.id)
    const imageListRef = ref(storage, `images/${id}/`)
    const navigate = useNavigate();
    
    const handleUrl = (e) => {
        e.preventDefault()
        setImageUrl(e.target.value)
    }
    
    const handleFile = (e) => {
        e.preventDefault()
        setFile(e.target.files[0])
    }

    
    const editPost = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
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
        //Push a new post to Cloud Firestore.
        try {
            await updateDoc(doc(getFirestore(), 'posts', id), {
                author: authorName,
            title: titleText,
            text: postText,
            id: id,
            image_url: imageUrl
        }).then(navigate('/posts/'+ id))
        }
        catch(error) {
            prop.showError('Error editing post to Firebase Database: ' + error)
            console.error('Error editing post to Firebase Database', error)
        }
    }
    
    const downloadImageList = () => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [url, ...prev])
                })
            })
        })
    }
    
    const uploadImage = () => {
        
        if (file === null) {
            prop.showError('No file chosen!')
            return
        }
        const imageRef = ref(storage, `images/${id}/${id + file.name}`)
        
        uploadBytes(imageRef, file).then(() => {
            downloadImageList()
        })
    }

    const onImageFocus = (e) => {
        setImageUrl(e.target.currentSrc)
    }

    useEffect(() => {
        downloadImageList()
    }, [])

    return (
        <div className={styles.container} onClick={e => e.stopPropagation()}>
            <h1>Edit post:</h1>
            <form onSubmit={editPost}>
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
                    <textarea type='text' className={styles.post} id='create-post' rows={5} placeholder='Enter post content' value={post} onChange={handlePost}/>
                </div>

                <div className={styles.group}>
                    <label htmlFor="post-image">Post image URL</label>
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

                <div className={styles.buttons}>
                    <button type='submit'>Send</button>
                    <button type='button' onClick={cancelHandle}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export {EditPostForm}