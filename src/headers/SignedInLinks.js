import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../components/Authentification/AuthContext";
import "./nav.css";

const SignedInLinks = () => {
  const stylelink = {
    textDecoration: "none",
    color: "white ",
  };

  const { logout, currentUser } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/signin");
    } catch {}
  }

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
          <NavLink variant="link" to="/signin" onClick={handleLogout}>
            Log Out
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="btn-floating pink lighten-1 text-center">
            {currentUser.email.charAt(0)}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedInLinks;
