import styles from './NotFound.module.css'

const NotFound = () => {


    return (
        <div className={styles.container}>
            <h1>
                <p>404</p>
            </h1>
            <h3>
                <p>Page not found.</p>
            </h3>
        </div>
    )
}

export default NotFound