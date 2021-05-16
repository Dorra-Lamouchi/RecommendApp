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
        { title: 'Artificial Intelligence', year: 1994 },
        { title: 'design', year: 1972 },
        { title: 'Formation', year: 1974 },
        { title: 'training', year: 2008 },
        { title: 'technical', year: 1957 },
        { title: "marketing", year: 1993 },
        { title: 'reporting', year: 1994 },
        { title: 'research', year: 2003 },
        { title: 'analytics', year: 1966 },
        { title: 'Fengineering', year: 1999 },
        { title: 'finance', year: 2001 },
        { title: 'project management', year: 1980 },
        { title: 'health', year: 1994 },
        { title: 'customer service', year: 2010 },
        { title: 'safety', year: 2002 },
        { title: "certification", year: 1975 },
        { title: 'legal', year: 1990 },
        { title: 'database', year: 1999 },
        { title: 'coaching', year: 1954 },
        { title: 'logistics', year: 1977 },
        { title: 'mobile', year: 2002 },
        { title: 'C programming languag', year: 1995 },
        { title: 'human resources', year: 1991 },
        { title: "recruitment", year: 1946 },
        { title: 'management experience', year: 1997 },
        { title: 'programming', year: 1995 },
        { title: 'agile', year: 1994 },
        { title: 'business development', year: 2001 },
        { title: 'audit', year: 1998 },
        { title: 'architecture', year: 1968 },
        { title: 'governance', year: 1998 },
        { title: 'continuous improvement', year: 2014 },
        { title: 'product development', year: 1942 },
        { title: 'networking', year: 1931 },
        { title: 'CRM', year: 1960 },
        { title: 'computer science', year: 1999 },
        { title: 'SQL', year: 2011 },
        { title: 'video', year: 1936 },
        { title: 'installation', year: 1981 },
        { title: 'data analysis', year: 1954 },
        { title: 'statistics', year: 2002 },
        { title: 'coding', year: 2006 },
        { title: 'Microsoft Office', year: 1991 },
        { title: 'frameworks', year: 1985 },
        { title: 'BI', year: 2014 },
        { title: 'HTML', year: 2000 },
        { title: 'internship', year: 2000 },
        { title: 'Satge', year: 2006 },
        { title: 'software development', year: 1994 },
        { title: 'oracle', year: 1979 },
        { title: 'Alien', year: 1979 },
        { title: 'Java', year: 1950 },
        { title: 'teaching', year: 1964 },
        { title: 'ERP', year: 1940 },
        { title: 'Javascript', year: 1988 },
        { title: 'Tdigital marketing', year: 2006 },
        { title: 'Linux', year: 1988 },
        { title: 'SaaS', year: 1957 },
        { title: 'mathematics', year: 2012 },
        { title: 'project management skills', year: 1980 },
        { title: 'mechanical engineering', year: 2008 },
        { title: 'android', year: 1999 },
        { title: 'Adobe', year: 2012 },
        { title: 'ISO', year: 1997 },
        { title: 'C' + '\#', year: 1986 },
        { title: 'scrum', year: 2003 },
        { title: 'e-commerce', year: 1984 },
        { title: 'user experience', year: 1957 },
        { title: 'Python', year: 1981 },
        { title: 'technical skills', year: 1941 },
        { title: 'electrical engineering', year: 1959 },
        { title: 'Microsoft Word', year: 1958 },
        { title: "C", year: 1983 },
        { title: 'UX', year: 1992 },
        { title: 'physics', year: 1995 },
        { title: 'leadership development', year: 2000 },
        { title: 'AWS', year: 2001 },
        { title: 'UI', year: 1971 },
        { title: 'front-end', year: 2007 },
        { title: '.NET', year: 1976 },
        { title: 'MATLAB', year: 1962 },
        { title: 'API', year: 1944 },
        { title: 'photography', year: 2004 },
        { title: 'internal communications', year: 1984 },
        { title: 'chemicals', year: 1962 },
        { title: 'OS', year: 2010 },
        { title: 'ETL', year: 2017 },
        { title: 'telecom', year: 1987 },
        { title: 'research projects', year: 2016 },
        { title: 'big data', year: 1973 },
        { title: 'VMware', year: 1968 },
        { title: "statistical analysis", year: 1952 },
        { title: 'SolidWorks', year: 1995 },
        { title: 'datasets', year: 1948 },
        { title: 'Unix', year: 1921 },
        { title: 'information system', year: 2009 },
        { title: 'SQL server', year: 2000 },
        { title: 'machine learning', year: 2009 },
        { title: 'DNS', year: 1975 },
        { title: 'JOBS', year: 2009 },
        { title: 'Learning', year: 1975 },
    ];
    const initialFieldValues = {
        Nom: '',
        Domaine: '',
        Type: 'Hard',
        Image: '',
        Duree: '',
        NbPlaces: '',
        DateDebut: '',
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


        setfile(e.target.files[0]);
        const f = e.target.files[0].name;
        setValues({
            ...Values,
            Image: f,
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
        const filename = Values.Image;
        const storageRef = firebaseDb.storage().ref("images Formations");
        const fileRef = storageRef.child(filename);
        console.log("uploading..");
        fileRef.put(file).then(() => {
            console.log("uploaded successfuly");
        });
        const db = firebaseDb.firestore();
        db.collection("Formations").add({
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
            <form autoComplete='off' onSubmit={e => handleFormSubmit(e)} >

                <Grid container spacing={2} direction='column' alignItems="center" justify="space-evenly">
                    <fieldset>
                        <legend>Informations Publication</legend>
                        <Grid item container spacing={2} justify="space-evenly" alignItems="center" >
                            <Grid item container spacing={0} justify="space-evenly"  >
                                <Grid item xs={3} >
                                    <label>Nom de publication : </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField required label="Nom" value={Values.Nom} name="Nom" className="field" onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={0} justify="space-evenly" >
                                <Grid item xs={3} >
                                    <label>Domaine publication : </label>
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
                                    <label>Type de  publication: </label>
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
                                    <label>Importer une image:</label>
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
                    <fieldset>
                        <legend>Formation</legend>
                        <Grid item container spacing={2} justify="space-evenly">

                            <Grid item container xs={12} justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label>Le durée de la formation :   </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField required label="Durée" name="Duree" className="field" value={Values.Duree} type="number" onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                            <Grid item container justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label >Le nombre des places :  </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField required label="Nombre des places" value={Values.NbPlaces} name="NbPlaces" className="field" type="number" onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label >Quel est la date de debut<br /> de la formation: </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField required name="DateDebut" label="date" value={Values.DateDebut} className="field" type="date" onChange={handleInputChange} focused style={{ "marginTop": '0px' }} />
                                </Grid>
                            </Grid>
                            <Grid item container justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label >Le prix:</label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField required label="Prix" name="Prix" value={Values.Prix} className="field" type="number" onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                            <Grid item container justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label >Description</label>
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
                                    <label >Ajoutez des Tags pour <br />améliorer l'indexation <br />de la recherche de votre <br />publication:</label>
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
                                    <Button variant="contained" color="primary" style={{ 'marginTop': '50px' }} type="submit" value='Postuler' title="Postuler" >
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
