import styles from './CommentList.css?inline'
import { useState } from 'react'
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore"
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
    
    return (
        <div className={styles.container}>
            {comments.map(comment => 
                <div key={comment.timestamp.seconds} className={styles.comment}>
                    <p className={styles.commentText}>
                        {comment.text}
                    </p>
                    <div className={styles.userInfo}>Posted
                        {' ' + new Date(prop.postData.timestamp.seconds * 1000).toLocaleString("eu-EU", {dateStyle: "medium"}) + ', ' + 
                            new Date(prop.postData.timestamp.seconds * 1000).toLocaleTimeString("ru-Ru")
                        } 
                        by 
                        <img className={styles.userImg} src={prop.postData.profilePicUrl} alt='User avatar' />
                        <b className={styles.userName}>{prop.postData.author}</b>
                    </div>
                </div>    
            )}
        </div>
    )
}

export {CommentList}