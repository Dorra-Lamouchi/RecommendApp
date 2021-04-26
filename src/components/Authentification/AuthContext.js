import React, { useContext, useState, useEffect } from "react"
import { auth } from "../../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateName(name) {
    return currentUser.updateName(name)
  }

  function updatePhone(phone) {
    return currentUser.updatePhone(phone)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function createUser(name, phone, email) {
     currentUser.updateEmail(email)
     currentUser.updateName(name)
     currentUser.updatePhone(phone)
     return currentUser
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signin,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword, 
    updateName,
    updatePhone,
    createUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}