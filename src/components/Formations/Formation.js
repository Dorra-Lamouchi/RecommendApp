import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { AiOutlineSend } from "react-icons/ai";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import firebaseDb from "../../firebase";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import "./Formation.css"
function Formation(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        h3: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'red'
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
    }));
    const classes = useStyles();
    const AllTags = [
        { title: 'Artificial Intelligence' },
        { title: 'Intelligence Artificielle' },
        { title: 'design' },
        { title: 'recrutement' },
        { title: 'recruter' },
        { title: 'Formation' },
        { title: 'training' },
        { title: 'technical' },
        { title: 'job' },
        { title: "marketing" },
        { title: 'reporting' },
        { title: 'research' },
        { title: 'analytics' },
        { title: 'Fengineering' },
        { title: 'finance' },
        { title: 'project management' },
        { title: 'health' },
        { title: 'customer service' },
        { title: 'safety' },
        { title: "certification" },
        { title: 'legal' },
        { title: 'database' },
        { title: 'coaching' },
        { title: 'logistics' },
        { title: 'mobile' },
        { title: 'C programming languag' },
        { title: 'human resources' },
        { title: "recruitment" },
        { title: 'management experience' },
        { title: 'programming' },
        { title: 'agile' },
        { title: 'business development' },
        { title: 'audit' },
        { title: 'architecture' },
        { title: 'governance' },
        { title: 'continuous improvement' },
        { title: 'product development' },
        { title: 'networking' },
        { title: 'CRM' },
        { title: 'computer science' },
        { title: 'SQL' },
        { title: 'video' },
        { title: 'installation' },
        { title: 'data analysis' },
        { title: 'statistics' },
        { title: 'coding' },
        { title: 'Microsoft Office' },
        { title: 'frameworks' },
        { title: 'BI' },
        { title: 'HTML' },
        { title: 'internship' },
        { title: 'Satge' },
        { title: 'software development' },
        { title: 'oracle' },
        { title: 'Alien' },
        { title: 'Java' },
        { title: 'teaching' },
        { title: 'ERP' },
        { title: 'Javascript' },
        { title: 'Tdigital marketing' },
        { title: 'Linux' },
        { title: 'SaaS' },
        { title: 'mathematics' },
        { title: 'project management skills' },
        { title: 'mechanical engineering' },
        { title: 'android' },
        { title: 'Adobe' },
        { title: 'ISO' },
        { title: 'langage C' },
        { title: 'scrum' },
        { title: 'e-commerce' },
        { title: 'user experience' },
        { title: 'Python' },
        { title: 'technical skills' },
        { title: 'electrical engineering' },
        { title: 'Microsoft Word' },
        { title: 'C' + '\#' },
        { title: 'User Experience UX' },
        { title: 'physics' },
        { title: 'leadership development' },
        { title: 'AWS' },
        { title: 'USer Interface UI' },
        { title: 'front-end' },
        { title: '.NET' },
        { title: 'MATLAB' },
        { title: 'API' },
        { title: 'photography' },
        { title: 'internal communications' },
        { title: 'chemicals' },
        { title: 'Operating Systems OS' },
        { title: 'ETL' },
        { title: 'telecom' },
        { title: 'research projects' },
        { title: 'big data' },
        { title: 'VMware' },
        { title: "statistical analysis" },
        { title: 'SolidWorks' },
        { title: 'datasets' },
        { title: 'Unix' },
        { title: 'information system' },
        { title: 'SQL server' },
        { title: 'machine learning' },
        { title: 'domaines names Server DNS' },
    ];
    const initialFieldValues = {
        Nom: '',
        Domaine: '',
        Type: 'Hard',
        Image: '',
        Duree: '',
        NbPlaces: '',
        DateDebut: '',
        DatePost: '',
        Prix: '',
        Description: '',
        others: '',
        Tags: {
            // val1: AllTags[13],
            // val2: AllTags[12]
        }

    }
    const [Values, setValues] = useState(initialFieldValues)


    const options = AllTags.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });


    const handleInputChange = e => {
        var { name, value } = e.target
        if (e.target === 'DateDebut') {
            setValues({
                ...Values,
                [name]: value.toString()
            })
        }

        else
            setValues({
                ...Values,
                [name]: value
            })

    }
    const [file, setfile] = useState(null)

    const handleFileChange = e => {
        var { name, value } = e.target

        const d = new Intl.DateTimeFormat('fr-GB', { dateStyle: 'full', timeStyle: 'long' }).format(firebaseDb.firestore.Timestamp.now().toDate());

        setfile(e.target.files[0]);
        const f = e.target.files[0].name;
        setValues({
            ...Values,
            Image: f,
            DatePost: d,

        })
    }


    function nombre_occurences_tags(texte) {
        var div = texte.toLowerCase()

        if (div !== "" && div.length > 1) // mots de plus de 3 lettres
        {
            var obj_dico = {};
            for (let index of AllTags) {

                var re = new RegExp(index.title.toLocaleLowerCase(), 'g');
                obj_dico[index.title] = (div.match(re) || []).length;

            }
            return obj_dico
        }

    }
    function search_index(titre) {
        for (let index of AllTags) {
            if (index.title === titre) {
                return AllTags.indexOf(index);

            }

        }
    }
    const handleDescriptionChange = e => {
        var { name, value } = e.target
        setValues({
            ...Values,
            [name]: value,

        })
        var tab = nombre_occurences_tags(value);
        if (typeof tab !== 'undefined') {
            if (Object.keys(tab).length !== 0) {
                // console.log(tab)
                var max = Object.keys(tab).reduce((a, b) => {
                    if (value.trim() !== '') {

                        if (tab[a] > tab[b]) {
                            return a;
                        } else return b;

                    } else return AllTags[2].title;
                }
                );
                var max2 = Object.keys(tab).reduce((a, b) => {
                    if (value.trim() !== '') {
                        if (tab[a] > tab[b]) {
                            if (a === max) {
                                return b;
                            }
                            else
                                return a;
                        } else
                            if (b === max) {
                                return a;
                            } else
                                return b;

                    }
                    else return AllTags[3].title;
                });
                // console.log(max)
                // console.log(max2)
                setValues({
                    ...Values,
                    [name]: value,
                    Tags: {
                        val: AllTags[search_index(max)],
                        val1: AllTags[search_index(max2)],
                    },

                })
            }
        }



    }
    const addOrEdit = obj => {
        const nblike = 0;
        const filename = Values.Image;
        const storageRef = firebaseDb.storage().ref("images Formations");
        const fileRef = storageRef.child(filename);
        console.log("uploading..");
        fileRef.put(file).then(() => {
            console.log("uploaded successfuly");
        });
        const db = firebaseDb.firestore();
        db.collection("Formations").add({
            nblike,
            obj,
        });

    }
    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(Values);
        addOrEdit(Values)
        setValues(initialFieldValues)
    }
    const onTagsChange = (event, values) => {
        setValues({
            ...Values,
            Tags: values
        });
    }

    return (
        <div >
            <form autoComplete='off' onSubmit={e => handleFormSubmit(e)} className="myform">

                <Grid container spacing={2} direction='column' alignItems="center" justify="space-evenly">
                    <fieldset className="fieldset">
                        <legend className="legend">Informations Publication</legend>
                        <Grid item container spacing={2} justify="space-evenly" alignItems="center" >
                            <Grid item container spacing={0} justify="space-evenly"  >
                                <Grid item xs={3} >
                                    <label className="label">Nom de publication : </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField required label="Nom" value={Values.Nom} name="Nom" className="field" onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={0} justify="space-evenly" >
                                <Grid item xs={3} >
                                    <label className="label">Domaine publication : </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <FormControl required className="field">
                                        <InputLabel id="demo-simple-select-helper-label">Domaine</InputLabel>
                                        <Select

                                            labelId="demo-simple-select-helper-label"
                                            name="Domaine"
                                            color='primary'
                                            value={Values.Domaine}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            <MenuItem value={"Informatique"}>Informatique</MenuItem>
                                            <MenuItem value={"Mecanique"}>Mecanique</MenuItem>
                                            <MenuItem value={"Electrique"}>Electrique</MenuItem>
                                            <MenuItem value={"Litteraire"}>Litteraire</MenuItem>
                                            <MenuItem value={"Mathematique"}>Mathematique</MenuItem>
                                        </Select>
                                        <FormHelperText>domaine d'application</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={0} justify="space-evenly" >
                                <Grid item xs={3} >
                                    <label className="label">Type de  publication: </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <RadioGroup aria-label="gender" name="Type" value={Values.Type} onChange={handleInputChange}>
                                        <div className="radio" >
                                            <FormControlLabel value="Hard" control={<Radio color="primary" />} label="Hard" className="radioitem" labelPlacement="end" />
                                            <FormControlLabel value="Soft" control={<Radio color="primary" />} label="Soft" className="radioitem" labelPlacement="end" />
                                        </div>
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={0} justify="space-evenly" >
                                <Grid item xs={3} >
                                    <label className="label">Importer une image:</label>
                                </Grid>
                                <Grid item xs={7} style={{ 'paddingTop': '25px' }}>

                                    <input
                                        required
                                        // focused
                                        label="image"
                                        type="file"
                                        accept="image/*"
                                        name="Image"
                                        onChange={handleFileChange}



                                    />

                                </Grid>
                            </Grid>

                        </Grid>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="legend">Formation</legend>
                        <Grid item container spacing={2} justify="space-evenly">

                            <Grid item container xs={12} justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label className="label" className="label">Le durée de la formation :   </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField required label="Durée" name="Duree" className="field" value={Values.Duree} type="number" onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                            <Grid item container justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label className="label" >Le nombre des places :  </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField required label="Nombre des places" value={Values.NbPlaces} name="NbPlaces" className="field" type="number" onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label className="label" >Quel est la date de debut<br /> de la formation: </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField required name="DateDebut" label="date" value={Values.DateDebut} className="field" type="date" onChange={handleInputChange} focused style={{ "marginTop": '0px' }} />
                                </Grid>
                            </Grid>
                            <Grid item container justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label className="label" >Le prix:</label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField required label="Prix" name="Prix" value={Values.Prix} className="field" type="number" onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                            <Grid item container justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label className="label" >Description</label>
                                </Grid>
                                <Grid item xs={7}>
                                    {/* <TextField required label="Prix" name="Prix" value={Values.Prix} className="field" type="number" onChange={handleInputChange} /> */}
                                    <TextField
                                        required
                                        value={Values.Description}
                                        name="Description"
                                        id="outlined-multiline-static"
                                        label="Description"
                                        multiline
                                        rows={10}
                                        style={{ "width": '350px' }}
                                        onChange={handleDescriptionChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label className="label" >Ajoutez des Tags pour <br />améliorer l'indexation <br />de la recherche de votre <br />publication:</label>
                                </Grid>
                                <Grid item xs={7}>
                                    <div className="autocomplete" style={{ "marginTop": '23px' }}>
                                        <Autocomplete

                                            multiple
                                            limitTags={2}
                                            id="multiple-limit-tags"
                                            name="Tags"
                                            options={AllTags}
                                            onChange={onTagsChange}
                                            // eslint-disable-next-line react/jsx-no-duplicate-props
                                            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                            groupBy={(option) => option.firstLetter}
                                            getOptionLabel={(option) => option.title}
                                            value={Object.values(Values.Tags)}
                                            renderInput={(params) => (
                                                <TextField {...params} required={Object.values(Values.Tags).length === 0} value={Object.values(Values.Tags)} label="Tags" placeholder="Ajouter Tags" style={{ "width": '400px' }} />
                                            )}

                                        />
                                        <TextField label="Ajoutez des Tags spécifiques" name="others" value={Values.others} className="field" type="text" style={{ "marginTop": '12px' }} onChange={handleInputChange} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item container justify="space-evenly" alignItems="center" >
                                <Grid item xs={4} >
                                    <Button variant="contained" style={{ 'marginTop': '50px', 'backgroundColor': "#0047c1", 'color': 'white' }} type="submit" >
                                        Postuler <AiOutlineSend fontSize="large" className='icon' style={{ 'marginLeft': '10px' }} />
                                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    </fieldset>
                </Grid>
            </form>

        </div >
    )
}

export default Formation
