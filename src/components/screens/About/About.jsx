import styles from './About.module.css'

const About = () => {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>About</h1>
        <p className={styles.paragraph}>
          Currently, the blog is running in DEMO mode, which means any user who logged in using email or Google can write a post.
          However, in the release version, only users with email addresses from the approved list can create posts.
          Adding comments is open to any logged-in user, regardless of whether the blog is in DEMO mode or not.
          Both registered and non-registered users can read posts and comments.
        </p>
        <p className={styles.paragraph}>
          Welcome to our blog! We aim to create a platform where users can share their thoughts and insights freely.
          Whether you are an authorized user or just passing by, we encourage you to explore and engage with the content shared by our community.
          Please note that during DEMO mode, posting is unrestricted, but this will change in the final release to ensure a secure and trusted environment.
        </p>
        <p className={styles.paragraph}>
          We appreciate your support and feedback as we continue to develop and improve this blog.
          If you have any questions or suggestions, feel free to reach out to us at <a href="mailto:proffery@gmail.com">proffery@gmail.com</a>.
        </p>
        <p className={styles.paragraph}>Happy reading and writing!</p>
      </div>
    )
  }
  
  export {About}