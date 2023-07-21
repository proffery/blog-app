import { Post } from '../../posts/Post/Post'
import styles from './Home.module.css'
import { Link, useNavigate } from "react-router-dom"
import { Flip, Bounce } from 'react-reveal/'

const Home = (prop) => {

    const navigate = useNavigate()

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
            {prop.posts.length > 0 ? (
                <Flip left>
                    <Post 
                        postData={prop.posts[0]} 
                        isOpened={false}
                        readMoreVisibility={false}
                        refreshPage={refreshPage}
                        deletePost={deletePost}
                        showError={showError}
                    />
                </Flip>
            )
                :
                (<div>No posts yet</div>)
            }
        
            {prop.posts.length > 1 &&
                <Bounce right cascade>
                <div className={styles.lastThreePosts}>
                        <div className={styles.lastThreeContainer} onClick={() => {navigate('/posts/'+ prop.posts[1].id) }}>
                            {prop.posts[1].image_url !== '' &&
                                <div className={styles.postImageHolder}>
                                    <img className={styles.lastThreePostImage} src={prop.posts[1].image_url} alt="Post image" />
                                </div>
                            }
                            <div className={styles.vertical}>
                                <div>
                                    <h2 className={styles.title}><Link to={'/posts/' + prop.posts[1].id}>{prop.posts[1].title}&#8599;</Link></h2>
                                    <p className={styles.content}>{prop.posts[1].text}</p>
                                </div>
                                <div className={styles.userInfo}>Posted
                                    {' ' + new Date(prop.posts[1].timestamp.seconds * 1000).toLocaleString("ru-RU", {dateStyle: "short"}) + ', ' + 
                                            new Date(prop.posts[1].timestamp.seconds * 1000).toLocaleTimeString("ru-Ru") + ' '
                                        }
                                </div>
                            </div>
                        </div>
                    {prop.posts.length > 2 &&
                     
                    <div className={styles.lastThreeContainer} onClick={() => {navigate('/posts/'+ prop.posts[2].id) }}>
                                {prop.posts[2].image_url !== '' &&
                                    <div className={styles.postImageHolder}>
                                        <img className={styles.lastThreePostImage} src={prop.posts[2].image_url} alt="Post image" />
                                    </div>
                                }
                            <div className={styles.vertical}>
                                <div>
                                    <h2 className={styles.title}><Link to={'/posts/' + prop.posts[2].id}>{prop.posts[2].title}&#8599;</Link></h2>
                                    <p className={styles.content}>{prop.posts[2].text}</p>
                                </div>
                                <div className={styles.userInfo}>Posted
                                {' ' + new Date(prop.posts[2].timestamp.seconds * 1000).toLocaleString("ru-RU", {dateStyle: "short"}) + ', ' + 
                                        new Date(prop.posts[2].timestamp.seconds * 1000).toLocaleTimeString("ru-Ru") + ' '
                                    }
                                </div>
                            </div>
                    </div>   
                    }

                    {prop.posts.length > 3 &&
                        <div className={styles.lastThreeContainer} onClick={() => {navigate('/posts/'+ prop.posts[3].id) }}>
                                    {prop.posts[3].image_url !== '' &&
                                        <div className={styles.postImageHolder}>
                                            <img className={styles.lastThreePostImage} src={prop.posts[3].image_url} alt="Post image" />
                                        </div>
                                    }
                                <div className={styles.vertical}>
                                    <div>
                                        <h2 className={styles.title}><Link to={'/posts/' + prop.posts[3].id}>{prop.posts[3].title}&#8599;</Link></h2>
                                        <p className={styles.content}>{prop.posts[3].text}</p>
                                    </div>
                                    <div className={styles.userInfo}>Posted
                                    {' ' + new Date(prop.posts[3].timestamp.seconds * 1000).toLocaleString("ru-RU", {dateStyle: "short"}) + ', ' + 
                                            new Date(prop.posts[3].timestamp.seconds * 1000).toLocaleTimeString("ru-Ru") + ' '
                                        }
                                </div>
                                </div>
                        </div>
                    }
                </div>
            </Bounce>
            }
            
            {prop.posts.map((post, index) => 
                ((index >= 4 ) && (index < 6)) &&
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