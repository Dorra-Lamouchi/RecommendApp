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
import "../Formations/Formation.css";

function Emploi(props) {
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
    const top100Films = [
        { title: 'Artificial Intelligence', year: 1994 },
        { title: 'Mecaniq', year: 1972 },
        { title: 'Formation', year: 1974 },
        { title: 'training', year: 2008 },
        { title: 'fixer', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
        { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
        { title: 'Casablanca', year: 1942 },
        { title: 'City Lights', year: 1931 },
        { title: 'Psycho', year: 1960 },
        { title: 'The Green Mile', year: 1999 },
        { title: 'The Intouchables', year: 2011 },
        { title: 'Modern Times', year: 1936 },
        { title: 'Raiders of the Lost Ark', year: 1981 },
        { title: 'Rear Window', year: 1954 },
        { title: 'The Pianist', year: 2002 },
        { title: 'The Departed', year: 2006 },
        { title: 'Terminator 2: Judgment Day', year: 1991 },
        { title: 'Back to the Future', year: 1985 },
        { title: 'Whiplash', year: 2014 },
        { title: 'Gladiator', year: 2000 },
        { title: 'Memento', year: 2000 },
        { title: 'The Prestige', year: 2006 },
        { title: 'The Lion King', year: 1994 },
        { title: 'Apocalypse Now', year: 1979 },
        { title: 'Alien', year: 1979 },
        { title: 'Sunset Boulevard', year: 1950 },
        { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
        { title: 'The Great Dictator', year: 1940 },
        { title: 'Cinema Paradiso', year: 1988 },
        { title: 'The Lives of Others', year: 2006 },
        { title: 'Grave of the Fireflies', year: 1988 },
        { title: 'Paths of Glory', year: 1957 },
        { title: 'Django Unchained', year: 2012 },
        { title: 'The Shining', year: 1980 },
        { title: 'WALL·E', year: 2008 },
        { title: 'American Beauty', year: 1999 },
        { title: 'The Dark Knight Rises', year: 2012 },
        { title: 'Princess Mononoke', year: 1997 },
        { title: 'Aliens', year: 1986 },
        { title: 'Oldboy', year: 2003 },
        { title: 'Once Upon a Time in America', year: 1984 },
        { title: 'Witness for the Prosecution', year: 1957 },
        { title: 'Das Boot', year: 1981 },
        { title: 'Citizen Kane', year: 1941 },
        { title: 'North by Northwest', year: 1959 },
        { title: 'Vertigo', year: 1958 },
        { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
        { title: 'Reservoir Dogs', year: 1992 },
        { title: 'Braveheart', year: 1995 },
        { title: 'Requiem for a Dream', year: 2000 },
        { title: 'Amélie', year: 2001 },
        { title: 'A Clockwork Orange', year: 1971 },
        { title: 'Like Stars on Earth', year: 2007 },
        { title: 'Taxi Driver', year: 1976 },
        { title: 'Lawrence of Arabia', year: 1962 },
        { title: 'Double Indemnity', year: 1944 },
        { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
        { title: 'Amadeus', year: 1984 },
        { title: 'To Kill a Mockingbird', year: 1962 },
        { title: 'Toy Story 3', year: 2010 },
        { title: 'Logan', year: 2017 },
        { title: 'Full Metal Jacket', year: 1987 },
        { title: 'Dangal', year: 2016 },
        { title: 'The Sting', year: 1973 },
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: "Singin' in the Rain", year: 1952 },
        { title: 'Toy Story', year: 1995 },
        { title: 'Bicycle Thieves', year: 1948 },
        { title: 'The Kid', year: 1921 },
        { title: 'Inglourious Basterds', year: 2009 },
        { title: 'JOB', year: 2000 },
        { title: '3 Idiots', year: 2009 },
        { title: 'Monty Python and the Holy Grail', year: 1975 },
    ];
    const initialFieldValues = {
        Nom: '',
        Domaine: '',
        Type: 'Hard',
        Image: '',
        Experience: '',
        Contrat: '',
        DateDebut: '',
        DatePost: '',
        TypeTravail: 'Complet',
        Description: '',
        others: '',
        Tags: {
            // val1: top100Films[13],
            // val2: top100Films[12]
        }

    }
    const [Values, setValues] = useState(initialFieldValues)


    const options = top100Films.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });
    const handleInputChange = e => {
        var { name, value } = e.target
        if (e.target === 'DateDebut') {
            const d = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(value);

            setValues({
                ...Values,
                [name]: d
            })
        }

        else
            setValues({
                ...Values,
                [name]: value
            })

    }
    function nombre_occurences_tags(texte) {
        var div = texte.toLowerCase()

        if (div !== "" && div.length > 2) // mots de plus de 3 lettres
        {
            var obj_dico = {};
            for (let index of top100Films) {

                var re = new RegExp(index.title.toLocaleLowerCase(), 'g');
                obj_dico[index.title] = (div.match(re) || []).length;

            }
            return obj_dico
        }

    }
    function search_index(titre) {
        for (let index of top100Films) {
            if (index.title === titre) {
                return top100Films.indexOf(index);

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

                    } else return top100Films[2].title;
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
                    else return top100Films[3].title;
                });
                setValues({
                    ...Values,
                    [name]: value,
                    Tags: {
                        val: top100Films[search_index(max)],
                        val1: top100Films[search_index(max2)],
                    },

                })
            }
        }



    }
    const [file, setfile] = useState(null)

    const handleFileChange = e => {
        setfile(e.target.files[0]);
        const f = e.target.files[0].name;
        const d = new Intl.DateTimeFormat('fr-GB', { dateStyle: 'full', timeStyle: 'long' }).format(firebaseDb.firestore.Timestamp.now().toDate());

        setValues({
            ...Values,
            Image: f,
            DatePost: d,
        })
    }

    const addOrEditemploi = obj => {
        const filename = Values.Image;
        const storageRef = firebaseDb.storage().ref("images Offres Travaille");
        const fileRef = storageRef.child(filename);
        console.log("uploading..");
        fileRef.put(file).then(() => {
            console.log("uploaded successfuly");
        });
        const db = firebaseDb.firestore();
        db.collection("OffresEmploi").add({
            obj,
        });


    }
    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(Values);
        addOrEditemploi(Values)
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
                        <legend>Offre d'emploi</legend>
                        <Grid item container spacing={2} justify="space-evenly">

                            <Grid item container xs={12} justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label >L'experience requise : </label>
                                </Grid>
                                <Grid item xs={7}>

                                    <TextField required label="exp" name="Experience" className="field" value={Values.Experience} type="number" onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label >La date de debut : </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField required name="DateDebut" label="date" value={Values.DateDebut} className="field" type="date" onChange={handleInputChange} focused style={{ "marginTop": '0px' }} />
                                </Grid>
                            </Grid>
                            <Grid item container justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label >Type de contrat: </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-helper-label">Contrat</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            name="Contrat"
                                            value={Values.Contrat}
                                            color='primary'
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            <MenuItem value={"Contrat d’apprentissage (alternance)"}>Contrat d’apprentissage (alternance)</MenuItem>
                                            <MenuItem value={"Contrat de professionnalisation (alternance)"}>Contrat de professionnalisation (alternance)</MenuItem>
                                            <MenuItem value={"CUI – Contrat unique d’insertion"}>CUI – Contrat unique d’insertion</MenuItem>
                                            <MenuItem value={"CAE - Contrat d’accompagnement dans l’emploi"}>CAE - Contrat d’accompagnement dans l’emploi</MenuItem>
                                            <MenuItem value={"CIE - Contrat initiative emploi"}>CIE - Contrat initiative emploi</MenuItem>
                                            <MenuItem value={"CIE - Contrat initiative emploi"}>Stage</MenuItem>

                                        </Select>
                                        <FormHelperText>selectionner une type</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid item container justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label>Type de travail:</label>
                                </Grid>
                                <Grid item xs={7}>
                                    <RadioGroup aria-label="gender" name="TypeTravail" value={Values.TypeTravail} onChange={handleInputChange}>
                                        <div className="radio" >
                                            <FormControlLabel value="Complet" control={<Radio color="primary" />} label="Complet" className="radioitem" labelPlacement="end" />
                                            <FormControlLabel value="Partiel" control={<Radio color="primary" />} label="Partiel" className="radioitem" labelPlacement="end" />
                                        </div>
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                            <Grid item container justify="space-evenly" >
                                <Grid item xs={4} >
                                    <label >Description</label>
                                </Grid>
                                <Grid item xs={7}>
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
                                            // limitTags={2}
                                            id="multiple-limit-tags"
                                            name="Tags"
                                            options={top100Films}
                                            onChange={onTagsChange}
                                            // eslint-disable-next-line react/jsx-no-duplicate-props
                                            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                            groupBy={(option) => option.firstLetter}
                                            getOptionLabel={(option) => option.title}
                                            value={Object.values(Values.Tags)}
                                            renderInput={(params) => (
                                                <TextField required={Object.values(Values.Tags).length === 0} value={Object.values(Values.Tags)} {...params} label="Tags" placeholder="Ajouter Tags" style={{ "width": '400px' }} />
                                            )}

                                        />
                                        <TextField label="Ajoutez des Tags spécifiques" value={Values.others} name="others" className="field" type="text" style={{ "marginTop": '12px' }} onChange={handleInputChange} />
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

        </div>
    )
}

export default Emploi
