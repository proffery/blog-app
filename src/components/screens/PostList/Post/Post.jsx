import styles from './Post.module.css'

const Post = (prop) => {
    console.log(prop)
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{prop.postData.title}</h3>
            <div className={styles.content}>{prop.postData.text}</div>
            <br />
            <i className={styles.userInfo}>Written by 
                <img className={styles.userImg} src={prop.postData.profilePicUrl} alt='User avatar' />
                <b className={styles.userName}>{prop.postData.author}</b>
            </i>
        </div>
    )
}

export {Post}