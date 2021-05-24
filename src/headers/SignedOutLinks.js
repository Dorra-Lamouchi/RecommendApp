import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./nav.css";

const SignedOutLinks = () => {
  const stylelink = {
    textDecoration: "none",
    color: "white ",
  };

  return (
    <div>
      <ul id="menuLeft">
        <li>
          <Link style={stylelink} to="/">
            Accueil
          </Link>
        </li>
        <li>
          <Link style={stylelink} to="/Stages">
            Stages
          </Link>
        </li>
        <li>
          <Link style={stylelink} to="/formations">
            Formations
          </Link>
        </li>
        <li>
          <Link style={stylelink} to="/emploi">
            Offres d'Emplois
          </Link>
        </li>
        <li>
          <Link style={stylelink} to="/contact">
            Contact
          </Link>
        </li>
        <li>
          <Link style={stylelink} to="/chatroom">
            Chatroom
          </Link>
        </li>
      </ul>
      <ul className="right">
        <li>
          <NavLink to="/signup">SignUp</NavLink>
        </li>
        <li>
          <NavLink to="/signin">SignIn</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedOutLinks;
