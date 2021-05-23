import React , {useState , useEffect} from 'react'
import firebaseDb from "../../firebase";
import { MDBCol, MDBIcon } from "mdbreact";
import Image from 'react-bootstrap/Image'
import {Container , Row , Col }from 'react-bootstrap'
import '../test.css'
import { ClickAwayListener } from '@material-ui/core';
import { Sync } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'
import StripeCheckout from "react-stripe-checkout";
import Modal from 'react-modal';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useAuth} from "../Authentification/AuthContext"

toast.configure();

const Affichedetail = (id) => {
    const stylecol = {
        marginTop : 50,
        color : 'black ',
        fontFamily: "Arial, Helvetica, sans-serif",
        textDecoration : 'Bold',
        fontSize: '20px',
      }

     
    
    const {currentUser} = useAuth()
    const [tags, settags] = useState([]);
    const [formation, setformation] = useState({});
    const [like, setLike]=useState(0)
    const [liked, setLiked]= useState(true)
  
    async function getPost() {
      firebaseDb.firestore().collection("Formations").doc(id.match.params.id).get().then(doc =>{
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        const data= doc.data().nblike;
        setLike(data);
        console.log("like1",like)
        return data;
      }
    })}
      

    function handleClick(){
      if (liked) {
        setLiked(false)
      } else {
        setLiked(true)
      }
      var nb
      //setLiked(liked => !liked)
      if (liked) {
         nb= like + 1
        setLike(nb )
        console.log('nb', nb)
        console.log('liked', like)
      } else {
        nb= like - 1
        setLike(nb )
        console.log('nb2', nb)
        console.log('disliked', like)
      }
      
      //setLike (liked ? like => like + 1 : like => like - 1)
      firebaseDb.firestore().collection('Formations').doc(id.match.params.id).update({
        nblike: nb,
      })

     if (liked){
      firebaseDb.firestore().collection("Formations").doc(id.match.params.id).get().then(doc => {
        if (doc.exists) {

          setformation(doc.data().obj);
          settags(doc.data().obj.Tags);
        
            firebaseDb.firestore().collection('User').doc(currentUser.uid).get().then((d) => {
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

              firebaseDb.firestore().collection('User').doc(currentUser.uid).update({
                Preferences: s,
              });
            });
        }
      
      });
    }
    }

    async function handleToken(token) {
      console.log({token})      
      toast("Success! Check email for details", { type: "success" });
      setModalIsOpenToFalse()
    }

    const [modalIsOpen,setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
        
    }

    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    var t;
    var s_index;

    useEffect(() => {
     
      const l=getPost()
      firebaseDb.firestore().collection("Formations").doc(id.match.params.id).get().then(doc => {
        if (doc.exists) {

          setformation(doc.data().obj);
          settags(doc.data().obj.Tags);
           t = setTimeout(() => {

            
            firebaseDb.firestore().collection('User').doc(currentUser.uid).get().then((d) => {

             var s = d.data().Preferences;
             console.log(s)
            doc.data().obj.Tags.forEach(element => {
               if(s.includes(element.title)){
                 s_index = s.lastIndexOf(element.title);
                 s.splice(s_index,1)
                s.unshift(element.title);

               }else{
                s.unshift(element.title);
               }

              });

              console.log("new s :", s)
               firebaseDb.firestore().collection('User').doc(currentUser.uid).update({

                Preferences: s,
              });
            });

          }, 10000);
        }
      });
    }, []);
    const history = useHistory()
    history.listen((location) => {
      clearTimeout(t);
    })
      return(
        <div >
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
        
        <button className="inscription-btn" onClick={setModalIsOpenToTrue}><i class="fas fa-eye"></i>Rejoindre</button>
        <Modal className="Modal" isOpen={modalIsOpen} onRequestClose={()=> setModalIsOpen(false)}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <h4><center> Paiement </center></h4>
                <p> êtes-vous sûr de vouloir rejoindre cette formation ?</p>
                <StripeCheckout
                stripeKey="pk_test_51Ir81fBlXB6unawPCVVOLK5nakA3m6vVH6HUwErRzDnA2TO4Y5RN6w9ALLTcceon3Ku89LlmoA5mRSocerzzZ3Qq00SlIFiZIx"
                token={handleToken}
                />  
        </Modal>
        <button className="like-btn" onClick={handleClick}> 
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
export default Affichedetail;