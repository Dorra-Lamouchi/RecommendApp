import React , {useState , useEffect} from 'react'
import firebase from "../../firebase";
import { MDBCol, MDBIcon } from "mdbreact";
import Image from 'react-bootstrap/Image'
import {Container , Row , Col }from 'react-bootstrap'
import dev from "../../assets/devper.jpg";
import '../test.css'
//import { getByPlaceholderText } from '@testing-library/dom';
 const Affichedetail = (id) => {
    const stylecol = {
        marginTop : 50,
        color : 'black ',
        fontFamily: "Arial, Helvetica, sans-serif",
        textDecoration : 'Bold',
        fontSize: '20px',
      }
    const [tags, settags] = useState([]);
    const [datedeb, setdatedeb] = useState()
    const [formation, setformation] = useState({});
    const [like, setLike]= useState(0);
   
    function handleLike() {
        setLike(prevLike => prevLike + 1)
      }

    useEffect(() => {
    const fetchData = async () => {
        const db = firebase.firestore();
        const data = db.collection("Formation").doc(id.match.params.id);
        var messageRef = db.collection("Formation").doc(id.match.params.id)
                .collection('tags').get();
        console.log("le message du tags:", messageRef);
        data.get().then((doc) => {
            if (doc.exists) {
                setformation(doc.data());
                //console(formation.tags[0]);
                //settags(doc.data().tags.map(tag => ({ ...tag.data()})));
                //settags(doc.data().tags);
                
                console.log("Document data:", doc.data());
                console.log(doc.data());
                console.log('le date est:' ,new Date(doc.data().DateDebut.seconds * 1000).toLocaleDateString());
                setdatedeb(new Date(doc.data().DateDebut.seconds * 1000).toLocaleDateString());
                //console.log("Document image:", doc.data().getDownloadURL())
          
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      
      };
      fetchData();
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
     <label className="title"><strong>{formation.Title}</strong></label>
      <Image src={dev} thumbnail  />
        <br/>
        <label className="mylabel"> Domaine: </label> <strong>{formation.Domaine}</strong>
        <br/>
        <label className="mylabel"> Entreprise : </label> <strong>{formation.entreprise}</strong>
        <br/>
        <label className="mylabel"> Formateur : </label> <strong>{formation.formateur}</strong>
        <br/>
        <label className="mylabel"> Date : </label> <strong>{datedeb}</strong>
        <br/>
        <label className="mylabel"> Durée : </label> <strong>{formation.duree}</strong>
        <br/>
        <label className="mylabel"> Nombre de place Disponible : </label> <strong>{formation.nombreplace}</strong>
        <br/>
        <label className="mylabel"> Prix : </label> <strong>{formation.prix}</strong><br/>
        <label className="mylabel">Tags </label> 
        <input type="button" className="myinput" value={formation.tags}  />
        {/*tags.map((tag) => 
        <input type="button" className="myinput" value={'#'+tag} key={tag.id} />
        )}
        {/*console.log('hi :',formation.tags[0])*/}
   
    </Col>
    <Col style={stylecol}>
          <label className="mylabel">Description</label><br/>
         <strong> {formation.description}</strong>
          
        </Col>
        
        <Col>
        <button className="inscription-btn"><i class="fas fa-eye"></i>Rejoindre</button>
        <button className="like-btn" onClick={() => this.handleLike}> 
          <span className="span-text">
            {like}
          </span>
        </button>
    

        </Col>

    
    </Row>
  
</Container>
        <div>
          
        </div>
              
           
  
        </div>
    )
}
export default Affichedetail ;