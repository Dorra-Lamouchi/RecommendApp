
import React , {useState , useEffect} from 'react'
import firebaseDb from "../../firebase";
import { MDBCol, MDBIcon } from "mdbreact";
import Image from 'react-bootstrap/Image'
import {Container , Row , Col }from 'react-bootstrap'
import '../test.css'
import { ClickAwayListener } from '@material-ui/core';
import { Sync } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'
 const Affichedetail = (id) => {
    const stylecol = {
        marginTop : 50,
        color : 'black ',
        fontFamily: "Arial, Helvetica, sans-serif",
        textDecoration : 'Bold',
        fontSize: '20px',
      }
    const [tags, settags] = useState([]);
    const [formation, setformation] = useState({});
    var t;
    var s_index;
    useEffect(() => {
      firebaseDb.firestore().collection("Formations").doc(id.match.params.id).get().then(doc => {
        if (doc.exists) {
          setformation(doc.data().obj);
          settags(doc.data().obj.Tags);
           t = setTimeout(() => {

            firebaseDb.firestore().collection('user').doc('1').get().then((d) => {
             var s = d.data().Preferences;
             doc.data().obj.Tags.forEach(element => {
               if(s.includes(element.title)){
                 s_index = s.lastIndexOf(element.title);
                 s.splice(s_index,1)
                s.unshift(element.title);
                //console.log("*s", s)
               }else{
                s.unshift(element.title);
               }
              });

              firebaseDb.firestore().collection('user').doc('1').update({
                Preferences: s,
              });
            });
            
          }, 3000);
        }
      });
    }, []);
    const history = useHistory()
    history.listen((location) => {
      clearTimeout(t);
    })
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
     <label className="title"><strong>{formation.Nom}</strong></label>
      <Image 
       src={"https://firebasestorage.googleapis.com/v0/b/firsttest-b7475.appspot.com/o/images%20Formations%2F"+formation.Image+"?alt=media&token=39971314-3f2c-4b25-b0d1-7c820b12489c"} 
       thumbnail  />
        <br/>
        <label className="mylabel"> Domaine: </label> <strong>{formation.Domaine}</strong>
        {/* <br/>
        <label className="mylabel"> Entreprise : </label> <strong>{formation.entreprise}</strong>
        <br/>
        <label className="mylabel"> Formateur : </label> <strong>{formation.formateur}</strong> */}
        <br/>
        <label className="mylabel"> Date : </label> <strong>{formation.DateDebut}</strong>
        <br/>
        <label className="mylabel"> Durée : </label> <strong>{formation.Duree}</strong>
        <br/>
        <label className="mylabel"> Nombre de place Disponible : </label> <strong>{formation.NbPlaces}</strong>
        <br/>
        <label className="mylabel"> Prix : </label> <strong>{formation.Prix}</strong><br/>
        <label className="mylabel">Tags </label> 
        {Object.keys(tags).map((tag) => 
        <input  key={tag.id} type="button" className="myinput" value={'#'+tags[tag].title}/>
        )}
    </Col>
    <Col style={stylecol}>
          <label className="mylabel">Description</label><br/>
         <strong> {formation.Description}</strong>
         <br/>
        <label className="mylabel">Informations Supplémentaires:</label><br/>
         <strong> {formation.others}</strong>
        </Col>
        <Col>
        <button className="inscription-btn"><i class="fas fa-eye"></i>Rejoindre</button>
        </Col>
    </Row>
</Container>
        <div>
        </div>
        </div>
    )

}
export default Affichedetail;