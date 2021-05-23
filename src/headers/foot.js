import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="black" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="12">
            <center>
            <h2>
              Made with <span style={{color:"red", width:'50px'}}>&hearts;</span> By engineering students FIA2-03
            </h2>
            </center>
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright 
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;