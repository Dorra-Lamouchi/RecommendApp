import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody} from 'mdbreact';
import '../SignUp/signUp.css';

const SignIn = () => {
return(
<div id="formpage">
<MDBContainer>
    <MDBRow>
        <MDBCol md="6">
            <MDBCard>
                <MDBCardBody>
                    <form>
                        <p className="h4 text-center pu-4">Sign In</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Your email"
                                icon="envelope"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right" 
                            />
                            <MDBInput
                                label="Your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                            />
                        </div>
                        <div className="text-center py-4 mt-3">
                        <button id="bouton" type="submit">
                            Log in
                        </button>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    </MDBRow>
</MDBContainer>

</div>
)}

export default SignIn;