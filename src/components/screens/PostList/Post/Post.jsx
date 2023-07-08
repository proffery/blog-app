import { useState } from "react"
import { EditPostForm } from './EditPostForm/EditPostForm'
import styles from './Post.module.css'
import {
    getAuth
} from 'firebase/auth'

const Post = (prop) => {
    console.log(prop)
    const [postFormVisibility, setPostFormVisibility] = useState('none')

    const deletePost = () => {
        prop.deletePost(prop.postData.id)
        prop.refreshPage()
    }

    const refreshPage = () => {
        prop.refreshPage()
    }

    const showError = (msg) => {
        prop.showError(msg)
      }

    const openCloseEditPostForm = () => {
        postFormVisibility === 'none' ? setPostFormVisibility('flex') : setPostFormVisibility('flex')
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{prop.postData.title}</h3>
            <div className={styles.content}>{prop.postData.text}</div>
            <br />
            <div className={styles.userInfo}>Posted by 
                <img className={styles.userImg} src={prop.postData.profilePicUrl} alt='User avatar' />
                <b className={styles.userName}>{prop.postData.author}</b>
            {!!getAuth().currentUser && (getAuth().currentUser.email === prop.postData.author &&
                <>
                    <div className={styles.editPostForm} style={{display: postFormVisibility,}}>
                        <EditPostForm postData={prop.postData} refreshPage={refreshPage} setPostFormVisibility={setPostFormVisibility} showError={showError}/>
                    </div>
                    <ul className={styles.options}>
                        <li>
                            <img className={styles.userImg} onClick={deletePost} src="/img/trash-can-outline.svg" alt="Delete" />
                        </li>
                        <li>
                            <img className={styles.userImg} onClick={openCloseEditPostForm} src="/img/text-box-edit-outline.svg" alt="Edit" />
                        </li>
                    </ul>
                </>
            )}
            </div>
        </div>
    )
}

export {Post}