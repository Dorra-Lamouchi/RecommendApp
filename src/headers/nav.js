
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import './nav.css'
const NavBar = () => {
 const stylelink = {
   textDecoration : 'none',
   color : 'white ',

 }
    return(
<div>
  <Navbar bg="dark" variant="dark"  >
    <Navbar.Brand href="#home">Mayfoutek~Chay</Navbar.Brand>
    <Nav className="mr-auto" >
      <Nav.Link ><Link style={stylelink} to="/">Accueil</Link></Nav.Link>
      <Nav.Link><Link style={stylelink} to="/Stages">Stages</Link></Nav.Link>
      <Nav.Link><Link style={stylelink} to="/formations">Formations</Link></Nav.Link>
      <Nav.Link ><Link  style={stylelink} to="/emploi">Offres d'Emplois</Link></Nav.Link>
      <Nav.Link><Link  style={stylelink} to="/contact">Contact</Link></Nav.Link>
    </Nav>
    <Form inline>
      <button className="btnn " >Se connecter</button> &nbsp;
      <button className="btn2 " >S'inscrire</button>
    </Form>
  </Navbar>
 </div>

    );
}
export default NavBar; 