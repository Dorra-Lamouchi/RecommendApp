import React from 'react'
import {Link} from 'react-router-dom'
import './nav.css'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {useAuth} from './../components/Authentification/AuthContext'

const NavBar = () => {
  const { currentUser } = useAuth()
  const links = currentUser ? <SignedInLinks /> : <SignedOutLinks />
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