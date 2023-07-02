import { Post } from './Post/Post'
import styles from './PostList.module.css'

const PostList = (prop) => {
    console.log(prop.posts)
    return (
        <div className={styles.container}>
            {prop.posts.map(post => 
                <div key={post.timestamp} className={styles.post}>
                    <Post postData={post}/>
                </div>
            )}
        </div>
    )
}

export {PostList}