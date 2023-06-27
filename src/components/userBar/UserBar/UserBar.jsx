import { useState } from "react"
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import styles from './UserBar.module.css'
import Login from "../Login/Login"
import Logout from "../Logout/Logout"
import Register from "../../screens/Register/Register"
import NotFound from "../../screens/NotFound/NotFound"
import CreatePost from "../../screens/CreatePost/CreatePost"

const UserBar = (prop) => {

  // eslint-disable-next-line no-unused-vars
  const [signInStatus, setSignInStatus] = useState(prop.prop === null ? false : !!prop.prop.auth.currentUser)
  const [errorWindow, setErrorWindow] = useState('hidden')
  const [errorMsg, setErrorMsg] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const authStateChanged = () => {
    prop.authStateChanged()
  }

  const showError = (msg) => {
    setErrorWindow('visible')
    setErrorMsg(msg)
    setTimeout(() => setErrorWindow('hidden'), 2000)
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
        <>
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
        </>
          ):(
            <div className={styles.group}>
              <Login prop={prop.prop} authStateChanged={authStateChanged} showError={showError}/>
              <div className={styles.register}> 
                <em>Don’t have an account? Register</em>
                <NavLink to='/register'>here</NavLink>
              </div>
            </div>
          )
        }
        <div className={styles.error} style={{
          visibility: errorWindow,
          }}>
          {errorMsg}
        </div>
      </div>
      <Routes>
        {!signInStatus ? 
          <Route path='/register' element={<Register showError={showError}/>} /> :
          (isAdmin && 
          <>
            <Route path='/newpost' element={<CreatePost user={prop.prop.auth.currentUser.email} showError={showError}/>} />
          </>
          )
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default UserBar