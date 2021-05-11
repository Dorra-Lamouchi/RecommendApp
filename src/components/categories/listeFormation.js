//import Card from '../Cards/CardsIU'
import {Link} from 'react-router-dom'
import React, { useEffect ,useState} from 'react'
import dev from "../../assets/dev.jpg";
import firebaseDb from "../../firebase";
import { MDBCol, MDBIcon } from "mdbreact";
import '../test.css'
import "mdbreact/dist/css/mdb.css";


const Formations = (props) =>  {
    
  const linkstyle = {
      color : 'black',
  }
  const [Formations, setFormations] = useState({});
  useEffect(() => {
    firebaseDb.firestore().collection("Formations").get().then(snapshot => {

        if (snapshot.empty) {
            // console.log("empty")
            setFormations({
            })
        } else {
            // console.log("not empty")
            var dat = {};
            snapshot.forEach(doc => {
                dat = doc.data()
                //obj = { ...obj, dat }

            });
            setFormations({
                ...dat,

            })
            // console.log(Object.keys(Formations))


        }


    }).catch(error => console.log(error))

}, [])
    // const [formations, setformations] = useState([]);
    // const [filtre, setfiltre] = useState("");
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const db = firebase.firestore();
    //     const data = await db.collection("Formation").get();
    //     setformations(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //   };
    //   fetchData();
    // }, []);
    // const filterrst = formations.filter((flt)=>{
    //     if(filtre === "")
    //     {return flt;}
    //     else if(flt.tags[0].toLowerCase().includes(filtre.toLowerCase())){
    //    return flt ;}
    //    else if(flt.Domaine.toLowerCase().includes(filtre.toLowerCase())){return flt ;}
    // });
        return (
            <>
             <MDBCol md="6" className="search-marg">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text blue lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search"  
    />
     </div>
    </MDBCol>
            <div className="container-fluid d-flex justify-content-center">
               <div className="row">
               {
                    Object.keys(Formations).map(data => {
                   return(
               <div className="col-md-6" key={data.id}>
                 <div className="card text-center shadow" >
        <div className="overflow">
        <Link to={"/afficheformation/"+data.id} ><img src={dev} alt="logo" className="card-img-top" /></Link>
        </div>
        <div className="card-body text-dark">
            <h4 className="card-title"> <Link to={"/afficheformation/"+data.id} style={linkstyle}>{Formations[data].Nom}</Link></h4>
            <p className="card-text text-dark">
             {Formations[data].Domaine}<br/>
             Aure lieu le <strong>{Formations[data].DateDebut}</strong><br/>
             <hr/>
             {Formations[data].Tags.map(num => {
               return (
                 <input type="button" className="myinput" value={'#'+num.title} key={num.id} />);
                
             })}
               
            </p>
            <p className="card-text"></p>
           
           
        </div>
    </div>
                     {/*  <Card key={data.id} title={data.Title} lien="afficheformation" img={dev} description={data.Domaine} formateur={data.formateur}  nombreplace={data.nombreplace} id={data.id} date={new Date(data.DateDebut.seconds * 1000).toLocaleDateString()}/>*/} 
                </div>
                   );
               })} 
               </div>
            </div>
          
     
            </>
        )
    }

export default  Formations;