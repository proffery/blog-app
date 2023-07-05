import { Post } from './Post/Post'
import styles from './PostList.module.css'

const PostList = (prop) => {
    const deletePost = (id) => {
        prop.deletePost(id)
        prop.refreshPage()
    }
    return (
        <div className={styles.container}>
            {prop.posts.map(post => 
                <div key={post.timestamp} className={styles.post}>
                    <Post postData={post} deletePost={deletePost}/>
                </div>
            )}
        </div>
    )
}

export {PostList}