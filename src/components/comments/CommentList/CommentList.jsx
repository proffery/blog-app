import styles from './CommentList.module.css'
import { useState } from 'react'
import { collection, query, where, getDocs, getFirestore, doc, deleteDoc } from "firebase/firestore"
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
            filteredData.push(comment.data());
        })
        setComments(filteredData)
    }

    const deleteComment = async(id) => {
        console.log(id)
        const db = getFirestore()
        const docRef = doc(db, "comments", id)
        deleteDoc(docRef)
          .catch(error => { prop.showError(error)
            .then(prop.refreshPage())
        })
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
                            <img className={styles.img} onClick={deleteComment(comment.id)} src="/img/trash-can-outline.svg" alt="Delete" />
                        </>
                        )}
                    </div>
                </div>    
            )}
        </div>
    )
}

export {CommentList}