
import React , {useState , useEffect} from 'react'
import firebaseDb from "../../firebase";
import { MDBCol, MDBIcon } from "mdbreact";
import Image from 'react-bootstrap/Image'
import {Container , Row , Col }from 'react-bootstrap'
import '../test.css'

const Affichestage  = (id) => {
    const stylecol = {
        marginTop : 50,
        color : 'black ',
        fontFamily: "Arial, Helvetica, sans-serif",
        textDecoration : 'Bold',
        fontSize: '20px',
      }
    const [emploi, setemploi] = useState({});
    const [tags, settags] = useState({});
    useEffect(() => {
      firebaseDb.firestore().collection("OffresEmploi").doc(id.match.params.id).get().then(doc => {
        if (doc.exists) {
          setemploi(doc.data().obj);
          settags(doc.data().obj.Tags);
        }
      });
  }, []);
      return(
        <div >
            <MDBCol md="6" className="search-marg">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text blue lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" />
     </div>
    </MDBCol>
    <Container>
  <Row>
    <Col xs={6} md={4}>
     <label className="title"><strong>{emploi.Nom}</strong></label>
      <Image 
       src={"https://firebasestorage.googleapis.com/v0/b/firsttest-b7475.appspot.com/o/images%20Offres%20Travaille%2F"+emploi.Image+"?alt=media&token=39971314-3f2c-4b25-b0d1-7c820b12489c"}  
      thumbnail  />
        <br/>
        <label className="mylabel"> Contrat : </label> <strong>{emploi.Contrat}</strong>
        <br/>
        <label className="mylabel"> Date Début : </label> <strong>{emploi.DateDebut}</strong>
        <br/>
        <label className="mylabel"> Expérience : </label> <strong>{emploi.Experience}</strong>
        <br/>
        <label className="mylabel"> Type Travail : </label> <strong> {emploi.TypeTravail}</strong>
        <br/>
        {Object.keys(tags).map(tag =>{
        return(
          <input type="button" className="myinput" value={'#'+tags[tag].title} />
        );
        })
        }
    </Col>
    <Col style={stylecol}>
          <label className="mylabel">Description</label><br/>
         <strong> {emploi.Description}</strong>
         <br/>
        <label className="mylabel">Informations Supplémentaires:</label><br/>
         <strong> {emploi.others}</strong>
        </Col>
        <Col>
        <button className="inscription-btn"><i class="fas fa-eye"></i>Postuler</button>
        </Col>
    </Row>
</Container>
        <div>
        </div> 
        </div>
    )
}
export default Affichestage;
