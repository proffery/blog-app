import { Post } from '../../posts/Post/Post'
import styles from './PostList.module.css'
import { Slide } from 'react-reveal/'

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
            <h1 className={styles.header}>All blog posts</h1>
            {prop.posts.map(post => 
                <div key={post.id} className={styles.post}>
                    <Slide bottom>
                        <Post 
                            postData={post} 
                            isOpened={false} 
                            readMoreVisibility={true}
                            refreshPage={refreshPage} 
                            deletePost={deletePost} 
                            showError={showError}
                        />
                    </Slide>
                </div>
            )}
        </div>
    )
}

export {PostList}