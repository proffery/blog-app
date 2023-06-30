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

const UserBar = (prop) => {

  // eslint-disable-next-line no-unused-vars
  const [signInStatus, setSignInStatus] = useState(prop.prop === null ? false : !!prop.prop.auth.currentUser)
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

  //DEMO MODE START!!!! Del or comment for switch off DEMO!
  const sliderChange = () => {
    isAdmin ? setIsAdmin(false) : setIsAdmin(true)
  }
  //DEMO MODE END!!!

  return (
    <HashRouter>
      <div className={styles.container}>
        {signInStatus ? (
          <Fade top when={userBarClass === 'userBarActive'}>
            <div className={styles.logout + ' ' + userBarClass}>
              <Logout prop={prop.prop} isAdmin={isAdmin} authStateChanged={authStateChanged}/> 
              {/* DEMO MODE START!!! Del or comment for switch off DEMO! */}
              <div className={styles.demo}>
                <div>DEMO</div>
                <label className={styles.switch}>
                <input className={styles.slider + '-input'} id='demo' type="checkbox" checked={isAdmin} onChange={sliderChange}/>
                <span className={styles.slider + ' ' + styles.round}></span>
                </label>
              </div>
              {/* DEMO MODE END!!! */}
            </div>
          </Fade>
          ):(
            <Fade top when={userBarClass === 'userBarActive'}>
              <div className={styles.login + ' ' + userBarClass}>
                <Login prop={prop.prop} authStateChanged={authStateChanged} showError={showError}/>
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
              <NavLink to='/about'>About</NavLink>
            </li>
            {/* {!signInStatus && 
              <li>
                <NavLink to='/register'>Register</NavLink>
              </li>
            } */}
            {isAdmin && 
              <li>
                <NavLink to='/newpost'>NewPost</NavLink>
              </li>
            }
            <li>
              <div className={styles.userStatus} onClick={openCloseUser}>
                <img src='/img/account-details-outline.svg' alt="User slider" className={styles.userSlider} ></img>
                {signInStatus && 
                <div className={styles.userEmail}>{prop.prop.email}</div>
                }
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
      <Route path='/' element={<div>postList</div>} />
      <Route path='/postlist' element={<div>postList</div>} />
      <Route path='/post:id' element={<div>Post</div>} />
        {!signInStatus ? 
          <Route path='/register' element={<Register showError={showError}/>} /> :
          (isAdmin && 
          <>
            <Route path='/newpost' element={<CreatePost user={prop.prop.auth.currentUser} showError={showError}/>} />
          </>
          )
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default UserBar