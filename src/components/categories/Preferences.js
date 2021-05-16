import React, { useState } from 'react'
import firebaseDb  from "../../firebase";
import { MDBRow} from 'mdbreact';
import Button from '@material-ui/core/Button';
import { AiOutlineSend } from "react-icons/ai";
import '../test.css';
import "mdbreact/dist/css/mdb.css";
import{ VscTasklist , VscTag} from "react-icons/vsc"; 
import "@pathofdev/react-tag-input/build/index.css";
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
const Preference = () =>  {
 const opensweetalert = () =>
  {
    Swal.fire({
      title: 'Warning!',
      text: "Veuillez choisir au moins une Tag!",
      type: 'warning',
      
    })
  }
  const history = useHistory()
  const faireRedirection = () =>{ 
    let url = "/accueil";
    history.push(url);
  
  }

const initialFieldValues = {
}
const [userid, setuserid] = useState('1')
const [Values, setValues] = useState(initialFieldValues)
const [btnValue, setbtnValue] = useState("Confirmer")
const Alltags = [
 'Artificial Intelligence', 
   'design', 
  'Formation', 
  'training',
   'technical', 
   "marketing", 
 'reporting', 
  'research', 
 'analytics', 
  'Fengineering', 
  'finance', 
  'project management', 
 'health', 
  'customer service', 
  'safety', 
"certification",
   'legal', 
 'database',
  'coaching', 
   'logistics', 
   'mobile', 
   'C (programming language)',
 'human resources', 
   "recruitment", 
'management experience', 
  'programming', 
  'agile',
 'business development', 
  'audit',
  'architecture',
'governance', 
'continuous improvement',
 'product development', 
   'networking', 
  'CRM', 
   'computer science',
  'SQL', 
  'video', 
 'installation', 
 'data analysis', 
 'statistics',
 'coding', 
'Microsoft Office', 
'frameworks',
  'BI', 
  'HTML', 
  'internship',
  'Stage',
  'software development',
   'oracle', 
  'Alien', 
'Java', 
 'teaching', 
'ERP', 
'Javascript', 
  'Tdigital marketing', 
  'Linux', 
  'SaaS', 
 'mathematics', 
  'project management skills',
  'mechanical engineering', 
 'android',
 'Adobe',
  'ISO',
   'C++',
   'scrum',
  'e-commerce' ,
  'user experience',
  'Python',
 'technical skills',
  'electrical engineering',
  'Microsoft Word',
  'C#',
  'UX',
   'physics',
   'leadership development',
  'AWS',
 'UI',
  'front-end',
   '.NET',
  'MATLAB',
  'API',
  'photography',
 'internal communications',
'chemicals',
  'OS',
  'ETL',
  'telecom',
 'research projects',
  'big data',
  'VMware',
  "statistical analysis",
  'SolidWorks',
  'datasets',
   'Unix',
  'information system',
 'SQL server',
  'machine learning',
   'DNS' ,
];
var tab;
var value;
const addOrEditemploi = tab => {
  tab.map((t) =>{
    firebaseDb.firestore().collection(`user`).doc(userid).update({
      Preferences:firebaseDb.firestore.FieldValue.arrayUnion(t),
    }
     )
     .then(() => {
      console.log("Document successfully written!")
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
    });
  })
    }
const onTagsChange = (event, values) => {
  setValues({
      ...Values,
      Preferences: values
  });
}
function handleFormSubmit(e) {
  e.preventDefault();
 for( value in Values){
  tab =Values[value];
}
if( tab.length === 0  ){
  opensweetalert();
}else{
  addOrEditemploi(tab)
  setValues(initialFieldValues);
  faireRedirection();
  }
}
return (
  <>
  <form onSubmit={e => handleFormSubmit(e)} >
<div className="container-fluid d-flex justify-content-center">
   <div className="row">
   <div  className="col-md-6" >
     <div className="card text-center shadow" style={{width : 600}} >
     <div className="overflow">
     <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                 <VscTasklist size="30"></VscTasklist> Préférences
                 </h3>
              </MDBRow>
           </div>
     </div>
     <div className="card-body text-dark">
         <h4 className="card-title"></h4>
         <p className="card-text">
         <Autocomplete
        options={Alltags}
        onChange={onTagsChange}
         multiple
         style={{width: 500}}
         defaultValue={[Alltags[1], Alltags[2]]}
         getOptionLabel={(option) => option}
         renderInput={(params) => (
           <TextField
             {...params}
            label={<VscTag size="25" style={{marginLeft : -340}}></VscTag>}
             variant="standard"
             placeholder="Tags..."
         />
         )}
             />
         </p>
         <p className="card-text">
          <Button variant="contained"
                  style={{ 'marginTop': '50px', 'backgroundColor': "#0047c1", 'color': 'white' }} 
                  type="submit" >
              {btnValue}
              <AiOutlineSend fontSize="large" className='icon' style={{ 'marginLeft': '10px' }} />
            </Button>
         </p>
         </div></div>
        </div>
     </div>
 </div>
 </form>
 </>
);
}
export default Preference;