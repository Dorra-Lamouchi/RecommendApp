import React from 'react'
import {Link} from 'react-router-dom'
import './nav.css'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const NavBar = () => {
 
  return (
    <nav className="navbar-custom nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo left">Mayfoutek~Chay</Link>
        <SignedInLinks />
        <SignedOutLinks />
      </div>
    </nav>
  )
}

export default NavBar