//import logo from './logo.svg';
import "./App.css";
//import firebasedb from './firebase';
//import Listpub from './listepublication'
//import Appp from './components/test'

import NavBar from './headers/nav';
import Footer from './headers/foot'
import React from 'react';
// import './components/Formations/Formation.css'
//import Search from './components/search'
import Formations from "./components/categories/formations";
//import Cards from "./components/Cards/Cards"
import Stages from "./components/categories/stages";
import Emploi from "./components/categories/emploi";
//import Form from 'react-bootstrap/Form'
import Contact from './components/contact'
import Accueil from './components/accueil'
import Affichemploi from './components/categories/afficheemploi'
import Affichestage from './components/categories/affichestage'
import Affichedetail from './components/categories/afficheformation'
import addemploi from './components/Emploi/Emploi'
import addformation from './components/Formations/Formation'
import affichercandidature from './components/Candidatures/Afficher'
import 'bootstrap/dist/css/bootstrap.min.css';



import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import SignUp from './components/Authentification/signUp';
import SignIn from './components/Authentification/signIn';
import { AuthProvider } from './components/Authentification/AuthContext';
import PrivateRoute from './components/Authentification/PrivateRoute';
import Preference from "./components/categories/Preferences";
import RecruterSignup from "./components/Authentification/RecruterSignup";

class App extends React.Component {


  render() {
    return (
      <AuthProvider>
        <Router>
          <div className="App">
            <div class="app-main__outer">
              <div class="app-main__inner"></div>
              <div class="tab-content">
                <div class="tab-pane tabs-animation fade show active" id="tab-content-0" role="tabpanel">
                  <div class="row-9" >

                    <NavBar />

                    <Switch>
                      <Route path="/signup" component={SignUp}></Route>
                      <Route path="/recrutersignup" component={RecruterSignup}></Route>
                      <Route path="/signin" component={SignIn}></Route>
                    </Switch>


                    <Route path="/" exact component={Accueil}></Route>
                    <Route path="/emploi" exact component={Emploi}></Route>
                    <Route path="/Formations" exact component={Formations}></Route>
                    <Route path="/Stages" exact component={Stages}></Route>
                    <Route path="/contact" exact component={Contact}></Route>
                    <PrivateRoute path="/afficheformation/:id" exact component={Affichedetail}></PrivateRoute>
                    <PrivateRoute path="/affichestage/:id" exact component={Affichestage}></PrivateRoute>
                    <PrivateRoute path="/afficheemploi/:id" exact component={Affichemploi}></PrivateRoute>

                    <Route path="/ajoutemploi" exact component={addemploi}></Route>
                    <Route path="/ajoutformation" exact component={addformation}></Route>
                    <Route path="/affichecondidature" exact component={affichercandidature}></Route>




                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </AuthProvider>
    );
  }
}



export default App;
