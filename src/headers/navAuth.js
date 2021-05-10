import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../components/Authentification/AuthContext';

const NavAuth = () => {
    const stylelink = {
        textDecoration : 'none',
        color : 'white ',
      }
    const history = useHistory()
    const {currentUser, logout} = useAuth()
    async function handleLogout() {
        try{
            await logout()
            history.push('/signin')
        } catch {
            
        }
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
      <Nav.Link ><Button className="btnn" variant="link" onClick={handleLogout}> Se déconnecter</Button></Nav.Link> 
      <Nav.Link> Profile {currentUser.email}</Nav.Link>
      </Form>
    </Navbar>
    </div>);
 }
    


export default NavAuth;