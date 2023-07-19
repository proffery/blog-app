import { Post } from '../../posts/Post/Post'
import styles from './Home.module.css'
import { Link,  } from "react-router-dom"

const Home = (prop) => {
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
            <h1 className={styles.header}>Recent posts</h1>
            {prop.posts.length > 0 ? 
                // (<div className={styles.lastPost + ' ' +'vertical'}>
                //     <div className={styles.postImageHolder}>
                //         {prop.posts[0].image_url !== '' &&
                //             <img className={styles.lastPostImage} src={prop.posts[0].image_url} alt="Post image" />
                //         }
                //     </div>
                //     <h2 className={styles.title}><Link to={'/posts/' + prop.posts[0].id}>{prop.posts[0].title}</Link></h2>
                //     <p className={styles.content}>{prop.posts[0].text}</p>
                // </div>)
                <Post 
                    postData={prop.posts[0]} 
                    isOpened={false}
                    readMoreVisibility={false}
                    refreshPage={refreshPage}
                    deletePost={deletePost}
                    showError={showError}
                />
                :
                (<div>No posts yet</div>)
            }
        
            {prop.posts.length > 1 &&
                <div className={styles.lastThreePosts}>
                    <div className={styles.horisontal}>
                            <div className={styles.postImageHolder}>
                                {prop.posts[1].image_url !== '' &&
                                    <img className={styles.lastThreePostImage} src={prop.posts[1].image_url} alt="Post image" />
                                }
                            </div>
                            <div className={styles.vertical}>
                                <div>
                                    <h2 className={styles.title}><Link to={'/posts/' + prop.posts[1].id}>{prop.posts[1].title}&#8599;</Link></h2>
                                    <p className={styles.content}>{prop.posts[1].text}</p>
                                </div>
                            </div>
                    </div>
                    {prop.posts.length > 2 &&
                        <div className={styles.horisontal}>
                                <div className={styles.postImageHolder}>
                                    {prop.posts[2].image_url !== '' &&
                                        <img className={styles.lastThreePostImage} src={prop.posts[2].image_url} alt="Post image" />
                                    }
                                </div>
                                <div className={styles.vertical}>
                                    <div>
                                        <h2 className={styles.title}><Link to={'/posts/' + prop.posts[2].id}>{prop.posts[2].title}&#8599;</Link></h2>
                                        <p className={styles.content}>{prop.posts[2].text}</p>
                                    </div>
                                </div>
                        </div>
                        
                    }
                    {prop.posts.length > 3 &&
                        <div className={styles.horisontal}>
                                <div className={styles.postImageHolder}>
                                    {prop.posts[3].image_url !== '' &&
                                        <img className={styles.lastThreePostImage} src={prop.posts[3].image_url} alt="Post image" />
                                    }
                                </div>
                                <div className={styles.vertical}>
                                    <div>
                                        <h2 className={styles.title}><Link to={'/posts/' + prop.posts[3].id}>{prop.posts[3].title}&#8599;</Link></h2>
                                        <p className={styles.content}>{prop.posts[3].text}</p>
                                    </div>
                                </div>
                        </div>
                    }
                </div>
            }
            
            {prop.posts.map((post, index) => 
                index >= 4 && 
                    <Post 
                        key={post.id}
                        postData={post} 
                        isOpened={false}
                        readMoreVisibility={false}
                        refreshPage={refreshPage}
                        deletePost={deletePost}
                        showError={showError} 
                    />
            )}
        </div>
    )
}


export { Home }