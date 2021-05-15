import React, { useContext, useState, useEffect } from "react"
import firebaseDb,{ auth } from "../../firebase"

const AuthContext = React.createContext()
const db= firebaseDb.firestore()
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(newUser) {
    return auth.createUserWithEmailAndPassword(newUser.Email, newUser.Password).then(resp => {
      return db.collection('User').doc(resp.user.uid).set({
        nom: newUser.Nom,
        tel: newUser.Phone,
        email: newUser.Email,
        status: newUser.Status
      });
    })
  }

  async function signupRec(newUser) {
    return auth.createUserWithEmailAndPassword(newUser.Email, newUser.Password).then(resp => {
      return db.collection('recruter').doc(resp.user.uid).set({
        nom: newUser.Nom,
        tel: newUser.Phone,
        email: newUser.Email,
        status: newUser.Status,
        societe: newUser.Company,
        domaine: newUser.Field
      });
    })
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
    const unsubscribe = auth.onAuthStateChanged(newUser => {
      setCurrentUser(newUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signin,
    signup,
    signupRec,
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