import styles from './CommentList.module.css'
import { useState } from 'react'
import { collection, query, where, getDocs, getFirestore, updateDoc, doc } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'
const CommentList = (prop) => {
    //console.log(prop.postData)
    const [comments, setComments] = useState([])
    
    useEffect (() => {
        loadCommens()
    }, [])

    const loadCommens = async() => {
        const commentsRef = collection(getFirestore(), 'comments')
        const q = query(commentsRef, where('id', '==', prop.postData.id))
        const filteredData = []
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((comment) => {
            filteredData.unshift(comment.data());
        })
        setComments(filteredData)
    }

    const deleteComment = async(e) => {
        await updateDoc(doc(getFirestore(), 'comments', e.target.id), {
            text: '*DELETED*'
        }).then(
            prop.refreshPage()
        )
    }
    
    return (
        <div className={styles.container}>
            {comments.map(comment => 
                <div key={comment.timestamp.seconds} className={styles.comment}>
                    <div className={styles.author}>
                        <img className={styles.img} src={comment.profilePicUrl} alt='User avatar' />
                        <b className={styles.name}>{comment.author}:</b>
                    </div>
                    <p className={styles.text}>
                        {comment.text}
                    </p>
                    <div className={styles.date}>Commented:
                        {' ' + new Date(comment.timestamp.seconds * 1000).toLocaleString("eu-EU", {dateStyle: "medium"}) + ', ' + 
                            new Date(comment.timestamp.seconds * 1000).toLocaleTimeString("ru-Ru")
                        } 
                        {!!getAuth().currentUser && (getAuth().currentUser.email === comment.author &&
                        <>
                            <img className={styles.img} onClick={deleteComment} id={comment.comment_id} src="/img/trash-can-outline.svg" alt="Delete" />
                        </>
                        )}
                    </div>
                </div>    
            )}
        </div>
    )
}

export {CommentList}