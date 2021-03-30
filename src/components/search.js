
import  { useState ,useEffect} from 'react'
import dev from "../assets/devper.jpg";
import firebase from "../firebase";
import Card from './Cards/CardsIU'
import './test.css'
// FormControl from 'react-bootstrap/FormControl'
//import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";
import { MDBCol, MDBIcon } from "mdbreact";


const Search = () => {
 const [filtre, setfiltre] = useState("");
 const [formation, setformation] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("Formation").get();
      setformation(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);
  const filterrst = formation.filter((flt)=>{
      if(filtre === "")
      {return null;}
      else if(flt.Domaine.toLowerCase().includes(filtre.toLowerCase())){
     return flt ;}
  });
    return(
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
     <div className="col-md-4">
         <Card title={data.Domaine} img={dev} description={data.formateur} date={data.DateDebut}/>   
      </div>
         );
     })} 
     </div>
  </div>
  </>
    );
}

export default Search ;
