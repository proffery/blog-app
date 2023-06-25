import { useState } from "react"
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import styles from './UserBar.module.css'
import Login from "../Login/Login"
import Logout from "../Logout/Logout"
import Register from "../../screens/Register/Register"
import NotFound from "../../screens/NotFound/NotFound"

const UserBar = (prop) => {

  // eslint-disable-next-line no-unused-vars
  const [signInStatus, setSignInStatus] = useState(prop.prop === null ? false : !!prop.prop.auth.currentUser)

  const authStateChanged = () => {
    prop.authStateChanged()
  }

  return (
    <HashRouter>
      <div className={styles.container}>
        {signInStatus ? (
          <Logout prop={prop.prop} authStateChanged={authStateChanged}/> 
        ):(
            <div className={styles.group}>
              <Login prop={prop.prop} authStateChanged={authStateChanged}/>
              <div className={styles.register}> 
                <em>Don’t have an account? Register</em>
                <NavLink to='/register'>here</NavLink>
              </div>
            </div>
          )
        }
      </div>
      <Routes>
        {!signInStatus && 
          <Route path='/register' element={<Register />} />
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default UserBar