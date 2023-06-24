import { useState, useEffect } from "react"
import styles from './UserBar.module.css'
import Login from "../Login/Login"
import Logout from "../Logout/Logout"

const UserBar = (prop) => {

  const [signInStatus, setSignInStatus] = useState(prop.prop === null ? false : !!prop.prop.auth.currentUser)

  const authStateChanged = () => {
    prop.authStateChanged()
  }

  useEffect(() => {
    prop.authStateChanged()
  }, [signInStatus])


  

  return (
    <>
      {signInStatus ?
        <Logout prop={prop.prop} authStateChanged={authStateChanged}/> :
        <Login prop={prop.prop} authStateChanged={authStateChanged}/>
      }
    </>
  )
}

export default UserBar