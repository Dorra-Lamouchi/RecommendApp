import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody} from 'mdbreact';
import './signUp.css';
import {auth} from '../../firebase';
import firebase from '../../firebase';

const SignUp = () => {

const [email, setEmail] = useState ('')
const [password, setPassword] = useState ('')

const onEmailChange =(event) => setEmail(event.target.value)
const onPasswordChange =(event) => setPassword(event.target.value)
const onSignUp = () => {
    console.log('sign up done successfully')
    console.log(email,password)
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(function(result){
        // result.user
    }).catch(function(error){
      // handle error  
    });
}

return(
<div id="formpage">
<MDBContainer>
    <MDBRow>
        <MDBCol md="6">
            <MDBCard>
                <MDBCardBody>
                    <form>
                        <p className="h4 text-center pu-4">Sign Up</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Your name"
                                icon="user"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                />
                            <MDBInput
                                label="Your email"
                                icon="envelope"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right" 
                                onChange={onEmailChange}
                            />
                            <MDBInput
                                label="Your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                                onChange={onPasswordChange}
                            />

                            <MDBInput
                                label="Confirm your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                                error="wrong"
                                success="right"
                            />
                        </div>
                        <div className="text-center py-4 mt-3">
                        <button id="bouton" type="submit" onClick={onSignUp}>
                            Register
                        </button>
                        <h6><a href="/signin"> déjà inscrit ? Sign in </a></h6>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    </MDBRow>
</MDBContainer>

</div>
)}

export default SignUp;