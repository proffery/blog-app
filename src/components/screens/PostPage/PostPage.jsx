import { useParams } from 'react-router-dom'
import { Post } from '../../posts/Post/Post'
import styles from './PostPage.module.css'

const PostPage = (prop) => {
    const { id } = useParams()
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
            <h1>#{id}</h1>
            {prop.posts.filter(singlepost => singlepost.id === id).map(post => 
                <div key={post.timestamp} className={styles.post}>
                    <Post postData={post} isOpened={true} refreshPage={refreshPage} deletePost={deletePost} showError={showError}/>
                </div>
            )}
        </div>
    )
}

export {PostPage}