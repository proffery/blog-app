import { useState } from "react"
import { HashRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
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
import {
  getAuth
} from 'firebase/auth'
import { Home } from "../../screens/Home/Home"
import { About } from "../../screens/About/About"

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
                  <Link to='/register'>here</Link>
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
          <li>
            <h1 className={styles.empty}></h1>
          </li>
          </ul>
              <div className={styles.userStatus} onClick={openCloseUser}>
                {signInStatus ?
                  (
                    <>
                      <img src={getAuth().currentUser.photoURL ||'./img/account-outline.svg'} alt="User slider" className={styles.userImg} ></img>
                      <p className={styles.userEmail}>{prop.user.auth.currentUser.email}</p>
                    </>
                  ) : (
                    <>
                      <p className={styles.userLogin}>Log in</p>
                    </>
                  )
                } 
              </div>
        </nav>
      </div>
      <Routes>
      <Route path='/' element={<Home posts={prop.posts} deletePost={deletePost} refreshPage={refreshPage} showError={showError}/>} />
      <Route path='/posts' element={<PostList posts={prop.posts} deletePost={deletePost} refreshPage={refreshPage} showError={showError}/>} />
      <Route path='/posts/:id' element={<PostPage refreshPage={refreshPage} posts={prop.posts} deletePost={deletePost} showError={showError}/>} />
        {!signInStatus ? 
          <Route path='/register' element={<Register showError={showError}/>} /> :
          (isAdmin && 
          <>
            <Route path='/newpost' element={<CreatePost refreshPage={refreshPage} user={prop.user.auth.currentUser} showError={showError}/>} />
          </>
          )
        }
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default UserBar