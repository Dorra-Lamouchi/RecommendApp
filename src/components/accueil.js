import React, { useState , useEffect } from 'react'
import dev from "../assets/dev.jpg";
import firebase from "../firebase";
import { MDBCol, MDBIcon } from "mdbreact";
import './test.css'
import {Link} from 'react-router-dom'
import Card from './Cards/CardsIU'
import "mdbreact/dist/css/mdb.css";
//import NavBar from "../headers/nav";


const Accueil = () => {
  const stylelink = {
    textDecoration : 'none',
    color : 'white ',
 
  }
  const linkstyle = {
    color : 'black',
}
    const [formations, setformations] = useState([]);
    const [publications, setpublications] = useState([]);
    const [filtre, setfiltre] = useState("");
    
    useEffect(() => {
      const fetchData = async () => {
        const db = firebase.firestore();
        const data = await db.collection("Formation").get();
        setformations(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      };
      const fetchData1 = async () => {
      const db = firebase.firestore();
        const data1 = await db.collection("publication").get();
        setpublications(data1.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      };
      fetchData();
      fetchData1();
    }, [],[]);
    const filterrst = formations.filter((flt)=>{
        if(filtre === "")
        {return flt;}
        else if(flt.tags[0].toLowerCase().includes(filtre.toLowerCase())){
       return flt ;}
      
      
    });
    const filterr = publications.filter((flt)=>{
      if(filtre === "")
      {return flt;}
      else if(flt.tags[0].toLowerCase().includes(filtre.toLowerCase())){
     return flt ;}
    
  });
        return (
            <>
            
      <MDBCol md="6" className="search-marg">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text blue lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search"  onChange={(event) =>{
        setfiltre(event.target.value);
    }}/>
     </div>
    </MDBCol>
            <div className="container-fluid d-flex justify-content-center">
               <div className="row">
               { filterrst.map(data => { 
                   return(
               <div className="col-md-4" key={data.id}>

                 <div className="card text-center shadow" >
        <div className="overflow">
        <Link to={"/afficheformation/"+data.id} ><img src={dev} alt="logo" className="card-img-top" /></Link>
        </div>
        <div className="card-body text-dark">
            <h4 className="card-title"> <Link to={"/afficheformation/"+data.id} style={linkstyle}>{data.Title}</Link></h4>
            <p className="card-text text-dark">
             {data.formateur}<br/>
             {data.nombreplace}<br/>
             {new Date(data.DateDebut.seconds * 1000).toLocaleDateString()}<br/>
             {data.tags.map(t =>{
               return (
                 <input type="button" className="myinput" value={'#'+t} key={t.id} />);
             })}
            </p>
            <p className="card-text"></p>
           
           
        </div>
    </div>

                  {/* <Card key={data} title={data.Title} lien="afficheformation" img={dev} description={data.Domaine} formateur={data.formateur} nombreplace={data.nombreplace} id={data.id} date={new Date(data.DateDebut.seconds * 1000).toLocaleDateString()}/> */}
                </div>
                   );
               })} 
                { filterr.map(data1 => { 
                   return(
               <div className="col-md-4" key={data1.id}>
                  <div className="card text-center shadow" >
        <div className="overflow">
        <Link to={data1.typecontrat == "stage" ? "/affichestage/"+data1.id :  "/afficheemploi/"+data1.id} ><img src={dev} alt="logo" className="card-img-top" /></Link>
        </div>
        <div className="card-body text-dark">
            <h4 className="card-title"> <Link to={data1.typecontrat == "stage" ? "/affichestage/"+data1.id :  "/afficheemploi/"+data1.id} style={linkstyle}>{data1.Title} , {data1.Domaine}</Link></h4>
            <p className="card-text text-dark">
             à <strong>{data1.entreprise.toUpperCase()}</strong><br/>
             <hr/>
             {data1.tags.map(t =>{
               return (
                <><input type="button" className="myinput" value={'#'+t} key={t.id} /> </>);
             })}
            </p>
            <p className="card-text"></p>
           
           
        </div>
    </div>
                {/* <Card key={data1.id} title={data1.Title} img={dev} description={data1.Domaine}    date={new Date(data1.DateDebut.seconds * 1000).toLocaleDateString()}/> */}
                
                
                   
                </div>
                   );
               })} 
               </div>
            </div>
           
            </>
        
    )
}
export default Accueil ;