import Card from '../Cards/CardsIU'
import React, { useEffect, useState } from 'react'
import firebaseDb from "../../firebase";
import { MDBCol, MDBIcon } from "mdbreact";
import '../test.css'
import "mdbreact/dist/css/mdb.css";
const Emploi = () =>  {
    
  
    const [Emplois, setEmplois] = useState([]);
    const [pic, setpic] = useState("");
    const [filtre, setfiltre] = useState("");
    useEffect(() => {
      var tab = [];
      firebaseDb.firestore()
      .collection("OffresEmploi")
      .get()
      .then(snapshot => {
          if (snapshot.empty) {
              //console.log("empty snap")
              setEmplois({
              })
          } else {
              // console.log(snapshot)
              var dat;
              snapshot.forEach(doc => {
                  dat = { ...doc.data(), id: doc.id };
                let storageRef = firebaseDb.storage().ref("images Offres Travaille/"+dat.obj.Image);
                storageRef.getDownloadURL()
                    .then(url => {setpic(url) 
                    
                    })
                    .catch(e=>{console.log(e);})
                  tab = [
                      ...tab,
                      dat,
                        
                  ]
              });
              setEmplois(
                  {
                      ...Emplois,
                      tab: tab,
                      
                  }
              )
          }
      }).catch(error => console.log(error));
    }, []);
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
               {  Object.entries(Object.assign({}, Emplois.tab)).map((key, value) => { 
                 if(key[1].obj.Contrat !== 'stage'){
                   return(
               <div  key={key[1].id} className="col-md-4">
                  <div className="card text-center shadow" >
        <div className="overflow">
        <Link to={"/affichestage/"+key[1].id} ><img height="190"
         src={"https://firebasestorage.googleapis.com/v0/b/firsttest-b7475.appspot.com/o/images%20Offres%20Travaille%2F"+key[1].obj.Image+"?alt=media&token=39971314-3f2c-4b25-b0d1-7c820b12489c"} 
         alt="logo"
         className="card-img-top" /></Link>
        </div>
        <div className="card-body text-dark">
            <h4 className="card-title"> <Link to={"/affichestage/"+key[1].id} style={linkstyle}>{key[1].obj.Nom.toUpperCase()}</Link></h4>
            <p className="card-text text-dark">
            <strong>{key[1].obj.Domaine}</strong><br/>
            <hr/>
             { Object.keys(key[1].obj.Tags).map(num => {
               return (
                <><input key={num.id}  type="button" className="myinput" value={'#'+key[1].obj.Tags[num].title} /> 
                </>
                );
             })}
            </p>
            <p className="card-text"></p>
           
           
        </div>
    </div>
                </div>
                   );
            }
               })} 
               </div>
            </div>
            </>
        )
    }

export default  Emploi;