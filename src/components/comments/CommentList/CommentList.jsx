import styles from './CommentList.module.css'
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
                    </div>
                </div>    
            )}
        </div>
    )
}

export {CommentList}