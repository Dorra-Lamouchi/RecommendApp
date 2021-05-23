
import React , {useState , useEffect} from 'react'
import firebaseDb from "../../firebase";
import { MDBCol, MDBIcon } from "mdbreact";
import Image from 'react-bootstrap/Image'
import {Container , Row , Col }from 'react-bootstrap'
import '../test.css'
import {Link} from 'react-router-dom';
import { useAuth } from '../Authentification/AuthContext';

const Affichestage  = (id) => {
  const linkstyle = {
    color : 'black',
}
    const stylecol = {
        marginTop : 50,
        color : 'black ',
        fontFamily: "Arial, Helvetica, sans-serif",
        textDecoration : 'Bold',
        fontSize: '20px',
      }

     
    
    //const [tags, settags] = useState({});
    const [formation, setformation] = useState({});
    const [datedeb, setdatedeb] = useState();
    const {currentUser} = useAuth()
    const [emploi, setemploi] = useState({});
    const [tags, settags] = useState({});
    const [like, setLike]=useState(0)
    const [liked, setLiked]= useState(true)
    var s_index;
    async function getPost() {
      firebaseDb.firestore().collection("OffresEmploi").doc(id.match.params.id).get().then(doc =>{
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
      firebaseDb.firestore().collection('OffresEmploi').doc(id.match.params.id).update({
        nblike: nb,
    })

    if (liked){
      firebaseDb.firestore().collection("OffresEmploi").doc(id.match.params.id).get().then(doc => {
        if (doc.exists) {

          setemploi(doc.data().obj);
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

    
    useEffect(() => {
      const l=getPost()
      firebaseDb.firestore().collection("OffresEmploi").doc(id.match.params.id).get().then(doc => {
        if (doc.exists) {
          setemploi(doc.data().obj);
          settags(doc.data().obj.Tags);
        }
      });
  }, []);
      return(
        <div >
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
        <Link to={"/Testaffichage/"+id.match.params.id} style={linkstyle}>  <button className="inscription-btn"><i class="fas fa-eye"></i>Postuler</button></Link>
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
export default Affichestage;
