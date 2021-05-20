import React ,{ useState } from 'react'
import {Link} from 'react-router-dom'
import './nav.css'
import SignedInLinksRec from './SignedInLinksRec'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {useAuth} from './../components/Authentification/AuthContext'
import firebaseDb from '../firebase'


const NavBar = () => {
  const [Status, setStatus] = useState('')
  const { currentUser } = useAuth()
if (currentUser){
  var userRef = firebaseDb.firestore().collection('recruter').doc(currentUser.uid);
  var userRef2 = firebaseDb.firestore().collection('User').doc(currentUser.uid);
  userRef.get().then(function(doc) {
    if (doc.exists) {
        //console.log("Users status is:", doc.data().status);
        setStatus(doc.data().status) 
    } else {
      userRef2.get().then(function(doc) {
        if (doc.exists) {
          setStatus(doc.data().status) 
        } 
    })
  }
})
}
  const links = currentUser ? (Status === 'recruter' ? <SignedInLinksRec /> : <SignedInLinks />) : <SignedOutLinks />
  return (
    <nav className="navbar-custom nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo left">Mayfoutek~Chay</Link>
        {links}
      </div>
    </nav>
  )

}

export default NavBar