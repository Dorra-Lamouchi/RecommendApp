
import Card from './CardsIU'
import React, { useEffect ,useState} from 'react'
import dev from "../../assets/devper.jpg";
import firebase from "../../firebase";
const Cards = () =>  {
    
  
    const [employee, setemployee] = useState([]);
 
  
    useEffect(() => {
      const fetchData = async () => {
        const db = firebase.firestore();
        const data = await db.collection("Formation").get();
        setemployee(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      };
      fetchData();
    }, []);
 
        return (
            <div className="container-fluid d-flex justify-content-center">
               <div className="row">
               { employee.map(data => { 
                   return(
               <div className="col-md-4">
                   <Card title={data.Domaine} img={dev} description={data.formateur} date={data.DateDebut}/>   
                </div>
                   );
               })} 
               </div>
            </div>
        )
    }

export default  Cards;