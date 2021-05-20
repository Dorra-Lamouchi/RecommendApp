import React, { useState, useEffect } from 'react'
import firebasedb from "../../firebase";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Afficher() {
    const useStyles = makeStyles((theme) => ({

        edit: {
            backgroundColor: '#0EE639'
        },
        delete: {
            backgroundColor: '#F70B0B'
        },
        cv: {
            backgroundColor: 'rgb(42, 193, 243)',
            width: '100%',
        },
        h1: {
            color: 'rgb(42, 193, 243)'
        },
    }));
    const classes = useStyles();
    const [Candidatures, setCandidatures] = useState([]);
    useEffect(() => {
        const fetchData = async (id) => {
            const db = firebasedb.firestore();
            const data = await db.collection("Candidature").get();
            setCandidatures(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchData();
    }, []);
    const OnDelete=async(doc) =>{
        // console.log("id= ",doc.id)
         const newList = Candidatures.filter((item) => item.id !== doc.id);
        // console.log(newList)
        firebasedb.firestore().collection("Candidature").doc(doc.id).delete();
    setCandidatures(newList);
    }
    const handlepdfshow = async (e) => {
        // console.log(e.target.innerText.toLowerCase())
        firebasedb.storage().ref("CV").child(e.target.innerText.toLowerCase()).getDownloadURL()
            .then((url) => {

                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    var blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
                console.log(url)
                var element = document.createElement('a');
                element.style.display = "none";
                element.setAttribute('href', url)
                element.setAttribute("target", "_blank");
                document.body.appendChild(element)
                element.click()

            })
            .catch((error) => {

            });



    }
    return (
        <div>
            <fieldset style={{ "width": '100%', 'padding': '10px', 'border': '1px black' }}>
                <h1 className={classes.h1}>Liste Des candidats</h1>
                <Grid container direction='row' spacing={1} alignItems="center" justify="space-evenly" style={{ "backgroundColor": 'rgb(42, 193, 243)', 'color': 'white', 'border': '2px solid rgb(42, 193, 243)' }}>

                    <Grid item container xs={2} justify="space-evenly" alignItems="center" >
                        <Grid item xs={12} >
                            <h2  >Nom</h2>
                        </Grid>
                    </Grid>
                    <Grid item container xs={2} justify="space-evenly">
                        <Grid item xs={12}>
                            <h2 >Prénom</h2>
                        </Grid>
                    </Grid>
                    <Grid item container xs={2} justify="space-evenly">
                        <Grid item xs={12} >
                            <h2 >Niveau d'etude</h2>
                        </Grid>
                    </Grid>
                    <Grid item container xs={2} justify="space-evenly">
                        <Grid item xs={12} >
                            <h2 >CV</h2>
                        </Grid>
                    </Grid>
                    <Grid item container xs={2} justify="space-evenly">
                        <Grid item xs={12} >
                            <h2 >Actions</h2>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    Object.keys(Candidatures).map(id => {
                        return (
                            <Grid key={id} container direction='row' spacing={1} alignItems="center" justify="space-evenly" style={{ "marginTop": '10px', 'borderBottom': '2px solid rgb(42, 193, 243)', 'color': 'blue' }} >

                                <Grid item container xs={2} justify="space-evenly" alignItems="center" >
                                    <Grid item xs={12} >
                                        <h3 >{Candidatures[id].Nom}</h3>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={2} justify="space-evenly">
                                    <Grid item xs={12}>
                                        <h3 >{Candidatures[id].Prenom}</h3>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={2} justify="space-evenly">
                                    <Grid item xs={12} >
                                        <h3 >{Candidatures[id].Niveau}</h3>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={2} justify="space-evenly">
                                    <Grid item xs={12} >
                                        <Button
                                            onClick={(e) => { handlepdfshow(e) }}
                                            size='medium'
                                            value={Candidatures[id].CV}
                                            // variant="outlined"
                                            className={classes.cv}
                                            startIcon={<VisibilityIcon />}
                                        >
                                            {Candidatures[id].CV}
                                        </Button>

                                    </Grid>
                                </Grid>


                                <Grid item container xs={2} justify="space-evenly" alignItems="center">
                                    <Grid item spacing={1} container >
                                        <Grid item xs={6}>
                                            <Button
                                                // onClick={() => { OnUpdate(id) }}
                                                size='small'
                                                // variant="outlined"
                                                className={classes.edit}
                                                startIcon={<CheckCircleIcon />}
                                            >
                                                Accepter
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                onClick={() => { OnDelete(Candidatures[id]) }}
                                                size='small'
                                                className={classes.delete}
                                                startIcon={<CancelIcon />}
                                            >
                                                Refuser
                                            </Button>
                                        </Grid>


                                    </Grid>
                                </Grid>
                            </Grid>

                        )


                    })
                }
            </fieldset>

        </div>
    )
}

export default Afficher
