import styles from './Post.module.css'
import {
    getAuth
} from 'firebase/auth'

const Post = (prop) => {
    
    const deletePost = () => {
        prop.deletePost(prop.postData.id)
        prop.refreshPage()
    }

    const editPost = () => {
        
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
                    <ul className={styles.options}>
                        <li>
                            <img className={styles.userImg} onClick={deletePost} src="/img/trash-can-outline.svg" alt="Delete" />
                        </li>
                        <li>
                            <img className={styles.userImg} onClick={editPost} src="/img/text-box-edit-outline.svg" alt="Edit" />
                        </li>
                    </ul>
                </>
            )}
            </div>
        </div>
    )
}

export {Post}