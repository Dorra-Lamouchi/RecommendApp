import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const SignedInLinks = () => {
  const stylelink = {
    textDecoration : 'none',
    color : 'white ', 
  }

  return (
    <div>
      <ul className="left">
        <li><Link style={stylelink} to="/">Accueil</Link></li>
        <li><Link style={stylelink} to="/Stages">Stages</Link></li>  
        <li><Link style={stylelink} to="/formations">Formations</Link></li>  
        <li><Link  style={stylelink} to="/emploi">Offres d'Emplois</Link></li>  
        <li><Link  style={stylelink} to="/contact">Contact</Link></li>
      </ul>
      <ul className="right">
        <li><NavLink variant="link" to="/">Log Out</NavLink></li>
        <li><NavLink to='/' className="btn-floating pink lighten-1 text-center">NN</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedInLinks