import { useState } from "react"
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import styles from './UserBar.module.css'
import './ActiveLink.css'
import Login from "../Login/Login"
import Logout from "../Logout/Logout"
import Register from "../../screens/Register/Register"
import NotFound from "../../screens/NotFound/NotFound"
import CreatePost from "../../screens/CreatePost/CreatePost"
import Fade from 'react-reveal/Fade'
import { PostList } from "../../screens/PostList/PostList"
import { PostPage } from '../../screens/PostPage/PostPage'

const UserBar = (prop) => {
//console.log(prop.posts)
  // eslint-disable-next-line no-unused-vars
  const [signInStatus, setSignInStatus] = useState(prop.user === null ? false : !!prop.user.auth.currentUser)
  const [errorWindow, setErrorWindow] = useState('hidden')
  const [errorMsg, setErrorMsg] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [userBarClass, setUserBarClass] = useState('userBarHidden')
  const [linksClass, setLinksClass] = useState('linksHidden')
  
  const authStateChanged = () => {
    prop.authStateChanged()
  }

  const showError = (msg) => {
    setErrorWindow('visible')
    setErrorMsg(msg)
    setTimeout(() => setErrorWindow('hidden'), 2000)
  }

  const openCloseUser = () => {
    userBarClass === 'userBarHidden' ? setUserBarClass('userBarActive') : setUserBarClass('userBarHidden')
    linksClass === 'linksHidden' ? setLinksClass('linksActive') : setLinksClass('linksHidden')
  }

  const deletePost = (id) => {
    prop.deletePost(id)
  }
  //DEMO MODE START!!!! Del or comment for switch off DEMO!
  const sliderChange = () => {
    isAdmin ? setIsAdmin(false) : setIsAdmin(true)
  }
  //DEMO MODE END!!!

  const refreshPage = () => {
    prop.refreshPage()
  }

  return (
    <HashRouter>
      <div className={styles.container}>
        {signInStatus ? (
          <Fade top when={userBarClass === 'userBarActive'}>
            <div className={styles.logout + ' ' + userBarClass}>
              <Logout prop={prop.user} isAdmin={isAdmin} authStateChanged={authStateChanged}/> 
            </div>
          </Fade>
          ):(
            <Fade top when={userBarClass === 'userBarActive'}>
              <div className={styles.login + ' ' + userBarClass}>
                <Login prop={prop.user} authStateChanged={authStateChanged} showError={showError}/>
                <div className={styles.register}> 
                  <em>Don’t have an account? Register</em>
                  <NavLink to='/register'>here</NavLink>
                </div>
              </div>
            </Fade>
          )
        }
        <div className={styles.error} style={{
          visibility: errorWindow,
          }}>
          {errorMsg}
        </div>
        <nav>
          <ul className={styles.links + ' ' + linksClass}>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/posts'>Posts</NavLink>
            </li>
            <li>
              <NavLink to='/about'>About</NavLink>
            </li>
            {/* {!signInStatus && 
              <li>
                <NavLink to='/register'>Register</NavLink>
              </li>
            } */}
            {isAdmin && 
              <li>
                <NavLink to='/newpost'>New</NavLink>
              </li>
            }
            {/* DEMO MODE START!!! Del or comment for switch off DEMO! */}
            {signInStatus &&
              <li>
                <div className={styles.demo}>
                  <label htmlFor='demo'>DEMO</label>
                  <label className={styles.switch}>
                  <input className={styles.slider + '-input'} id='demo' type="checkbox" checked={isAdmin} onChange={sliderChange}/>
                  <span className={styles.slider + ' ' + styles.round}></span>
                  </label>
                </div>
              </li>
            }
          {/* DEMO MODE END!!! */}
          </ul>
              <div className={styles.userStatus} onClick={openCloseUser}>
                <img src='./img/account-details-outline.svg' alt="User slider" className={styles.userSlider} ></img>
                {signInStatus && <p className={styles.userEmail}>{prop.user.auth.currentUser.email}</p>} 
              </div>
        </nav>
      </div>
      <Routes>
      <Route path='/' element={<PostList posts={prop.posts} deletePost={deletePost} refreshPage={refreshPage} showError={showError}/>} />
      <Route path='/posts' element={<PostList posts={prop.posts} deletePost={deletePost} refreshPage={refreshPage} showError={showError}/>} />
      <Route path='/posts/:id' element={<PostPage refreshPage={refreshPage} posts={prop.posts} showError={showError}/>} />
        {!signInStatus ? 
          <Route path='/register' element={<Register showError={showError}/>} /> :
          (isAdmin && 
          <>
            <Route path='/newpost' element={<CreatePost refreshPage={refreshPage} user={prop.user.auth.currentUser} showError={showError}/>} />
          </>
          )
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default UserBar