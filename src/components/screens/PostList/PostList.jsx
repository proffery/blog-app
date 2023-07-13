import { Post } from '../../posts/Post/Post'
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
            <h1>Posts:</h1>
            {prop.posts.map(post => 
                <div key={post.id} className={styles.post}>
                    <Post postData={post} isOpened={false} refreshPage={refreshPage} deletePost={deletePost} showError={showError}/>
                </div>
            )}
        </div>
    )
}

export {PostList}