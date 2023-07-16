import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { EditPostForm } from '../EditPostForm/EditPostForm'
import styles from './Post.module.css'
import {
    getAuth
} from 'firebase/auth'
import { AddComment } from "../../comments/AddComment/AddComment"
import { CommentList } from "../../comments/CommentList/CommentList"

const Post = (prop) => {
    const [postFormVisibility, setPostFormVisibility] = useState('none')
    const [commentsVisibility, setCommentsVisibility] = useState('none')
    const [readButtonText, setReadButtonText] = useState('Read more')
    const [readButtonStat, setReadButtonStat] = useState(prop.isOpened)
    const [commentsNumber, setCommentsNumber] = useState(0)
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
        navigate('/posts/'+ prop.postData.id)
    }

    const readMoreHandler = (e) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        readButtonStat ? setReadButtonStat(false) : setReadButtonStat(true)
    }


    useEffect (() => {
        readButtonStat ? (setReadButtonText('Read less'), setCommentsVisibility('flex')) : (setReadButtonText('Read more'), setCommentsVisibility('none'))
    }, [readButtonStat])

    useEffect (() => {
        
    }, [])

    return (
        <div className={styles.container}>
            <h2 className={styles.title} onClick={clickOnPostHandle}><Link to={'/posts/' + prop.postData.id}>{prop.postData.title}</Link></h2>
                <div className={styles.postHolder}>
                    {prop.postData.image_url !== '' &&
                        <div className={styles.postImageHolder}>
                            <img className={styles.postImage} src={prop.postData.image_url} alt="Post image" />
                        </div>
                    }
                    <p className={readButtonStat ? (styles.content + readButtonStat + ' ' + 'expanded') : styles.content}>
                        {prop.postData.text}
                    </p>
                </div>
            
                <div className={styles.commentList} style={{display: commentsVisibility,}}>
                    <CommentList postData={prop.postData} showError={showError} refreshPage={refreshPage} setCommentsNumber={setCommentsNumber}/>
                </div>  
            
            {!!getAuth().currentUser && 
                <>
                    <div className={styles.addComment}>
                        {readButtonStat && 
                            <AddComment postData={prop.postData} showError={showError} refreshPage={refreshPage}/>
                        }
                    </div>
                </>
            }
            <button className={styles.readMore} onClick={readMoreHandler}>{readButtonText}</button>
            <div className={styles.userInfo}>Posted
                {' ' + new Date(prop.postData.timestamp.seconds * 1000).toLocaleString("eu-EU", {dateStyle: "medium"}) + ', ' + 
                    new Date(prop.postData.timestamp.seconds * 1000).toLocaleTimeString("ru-Ru") + ' '
                } 
                by 
                    <img className={styles.img} src={prop.postData.profilePicUrl} alt='User avatar' />
                    <b className={styles.userName}>{prop.postData.author}</b>
                    <div className={styles.commensNumber} onClick={readMoreHandler}>
                        <img className={styles.img} src='./img/comment-outline.svg' alt='User avatar' />{commentsNumber}
                    </div>

                {!!getAuth().currentUser && (getAuth().currentUser.email === prop.postData.author &&
                    <>
                        <div className={styles.editPostForm} style={{display: postFormVisibility,}}>
                            <EditPostForm postData={prop.postData} refreshPage={refreshPage} setPostFormVisibility={setPostFormVisibility} showError={showError}/>
                        </div>
                        <ul className={styles.options}>
                            <li>
                                <img className={styles.img} onClick={deletePost} src="./img/trash-can-outline.svg" alt="Delete" />
                            </li>
                            <li>
                                <img className={styles.img} onClick={openCloseEditPostForm} src="./img/text-box-edit-outline.svg" alt="Edit" />
                            </li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    )
}

export {Post}