import Card from '../Cards/CardsIU'
import React, { useEffect ,useState} from 'react'
import dev from "../../assets/devper.jpg";
import '../test.css'
import firebase from "../../firebase";
import { MDBCol, MDBIcon } from "mdbreact";
import "mdbreact/dist/css/mdb.css";
const Stages = () =>  {
    
  
    const [stages, setstages] = useState([]);
    const [filtre, setfiltre] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        const db = firebase.firestore();
        const data = await db.collection("publication").where('typecontrat' , '==' , 'stage').get();
        setstages(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      };
      fetchData();
    }, []);
    const filterrst = stages.filter((flt)=>{
        if(filtre === "")
        {return flt;}
        else if(flt.Title.toLowerCase().includes(filtre.toLowerCase())){
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
               <div className="col-md-4">
                   <Card title={data.Title} img={dev} lien="affichestage" description={data.entreprise} date={data.nombreplace} date={new Date(data.DateDebut.seconds * 1000).toLocaleDateString()}/>   
                </div>
                   );
               })} 
               </div>
            </div>
            </>
        )
    }

export default  Stages;