import { useState, useEffect } from "react"
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import styles from './UserBar.module.css'
import Login from "../Login/Login"
import Logout from "../Logout/Logout"
import Register from "../../screens/Register/Register"
import NotFound from "../../screens/NotFound/NotFound"

const UserBar = (prop) => {

  // eslint-disable-next-line no-unused-vars
  const [signInStatus, setSignInStatus] = useState(prop.prop === null ? false : !!prop.prop.auth.currentUser)
  const [errorWindow, setErrorWindow] = useState('hidden')
  const [errorMsg, setErrorMsg] = useState('')
  

  // useEffect(() => {
  //   prop.prop === null ? setIsAdmin(false) : (prop.prop.auth.currentUser.email === getAdminEmail() ? setIsAdmin(true) : setIsAdmin(false))
  //   console.log(prop.prop.currentUser.email)
  // }, [])

  const authStateChanged = () => {
    prop.authStateChanged()
  }

  const showError = (msg) => {
    setErrorWindow('visible')
    setErrorMsg(msg)
    setTimeout(() => setErrorWindow('hidden'), 2000)
  }

  return (
    <HashRouter>
      <div className={styles.container}>
        {signInStatus ? (
          <Logout prop={prop.prop} authStateChanged={authStateChanged}/> 
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
        {!signInStatus && 
          <Route path='/register' element={<Register showError={showError}/>} />
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default UserBar