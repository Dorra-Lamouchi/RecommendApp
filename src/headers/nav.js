
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import './nav.css'
const NavBar = () => {
  const stylelink = {
    textDecoration: 'none',
    color: 'white ',
 }
    return(
<div>
  <Navbar bg="dark" variant="dark"  >
    <Navbar.Brand href="#home">Mayfoutek~Chay</Navbar.Brand>
    <Nav className="mr-auto" >
      <Nav.Link ><Link style={stylelink} to="/accueil">Accueil</Link></Nav.Link>
      <Nav.Link><Link style={stylelink} to="/Stages">Stages</Link></Nav.Link>
      <Nav.Link><Link style={stylelink} to="/formations">Formations</Link></Nav.Link>
      <Nav.Link ><Link  style={stylelink} to="/emploi">Offres d'Emplois</Link></Nav.Link>
      <Nav.Link><Link  style={stylelink} to="/contact">Contact</Link></Nav.Link>
       <Nav.Link><Link style={stylelink} to="/ajoutemploi">Ajouter Offre de travail</Link></Nav.Link>
          <Nav.Link><Link style={stylelink} to="/ajoutformation">Ajouter Formation</Link></Nav.Link>
          <Nav.Link><Link style={stylelink} to="/affichecondidature">Afficher les candidatures</Link></Nav.Link>
    </Nav>
    <Form inline>
      <Nav.Link ><Link style={stylelink} to="/signin"><button className="btnn "> Se connecter</button></Link></Nav.Link> &nbsp;
      <Nav.Link ><Link style={stylelink} to="/signup"><button className="btn2 "> S'inscrire </button></Link></Nav.Link>
    </Form>
  </Navbar>
 </div>

  );
}

export default NavBar; 

