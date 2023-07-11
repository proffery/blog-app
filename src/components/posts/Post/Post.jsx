import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { EditPostForm } from '../EditPostForm/EditPostForm'
import styles from './Post.module.css'
import {
    getAuth
} from 'firebase/auth'
import { AddComment } from "../../comments/AddComment/AddComment"

const Post = (prop) => {
    //console.log(new Date(prop.postData.timestamp * 1000).toLocaleString())
    const [postFormVisibility, setPostFormVisibility] = useState('none')
    const [readButtonText, setReadButtonText] = useState('Read more')
    const [readButtonStat, setReadButtonStat] = useState(false)
    const navigate = useNavigate()

    const deletePost = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        prop.deletePost(prop.postData.id)
        prop.refreshPage()
    }

    const refreshPage = () => {
        prop.refreshPage()
    }

    const showError = (msg) => {
        prop.showError(msg)
      }

    const openCloseEditPostForm = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        postFormVisibility === 'none' ? setPostFormVisibility('flex') : setPostFormVisibility('none')
    }

    const clickOnPostHandle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        navigate('/post/'+ prop.postData.id)
    }

    const readMoreHandler = (e) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        readButtonStat ? setReadButtonStat(false) : setReadButtonStat(true)
    }


    useEffect (() => {
        readButtonStat ? (setReadButtonText('Read less')) : (setReadButtonText('Read more'))
    }, [readButtonStat])

    return (
        <div className={styles.container}>
            <h3 className={styles.title} onClick={clickOnPostHandle}><Link to={'/post/' + prop.postData.id}>{prop.postData.title}</Link></h3>
            <p className={readButtonStat ? (styles.content + readButtonStat + ' ' + 'expanded') : styles.content}>
                {prop.postData.text}
            </p>
                {!!getAuth().currentUser && 
                    <div className={styles.addComment}>
                        {readButtonStat && 
                            <AddComment postData={prop.postData} showError={showError} refreshPage={refreshPage}/>
                        }
                    </div>
                }
            <button className={styles.readMore} onClick={readMoreHandler}>{readButtonText}</button>
            <div className={styles.userInfo}>Posted {new Date(prop.postData.timestamp.seconds * 1000).toLocaleString("ru-RU", {dateStyle: "short"})} by 
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