import { Post } from './Post/Post'
import styles from './PostList.module.css'

const PostList = (prop) => {
    const deletePost = (id) => {
        prop.deletePost(id)
        prop.refreshPage()
    }

    const refreshPage = () => {
        prop.refreshPage()
    }

    const showError = (msg) => {
        prop.showError(msg)
    }
    
    return (
        <div className={styles.container}>
            {prop.posts.map(post => 
                <div key={post.timestamp} className={styles.post}>
                    <Post postData={post} refreshPage={refreshPage} deletePost={deletePost} showError={showError}/>
                </div>
            )}
        </div>
    )
}

export {PostList}