// // import React from 'react'

// // const FormCandidature = (props) => {
// //     return (
// //         <div>
// //             <h1>Ici Le Formulaire De Candidature avec id= {props.match.params.id}</h1>
// //         </div>
// //     )./FormUI/Select
// // }

// // export default FormCandidature
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextFieldComponent from "./FormUI/textFieldComponent";
import ButtonComponent from "./FormUI/buttonComponent";
import firebaseDb from "../../firebase";
import { Grid, makeStyles, Container, Typography } from "@material-ui/core";
import Select from "./FormUi/Select";
import FileUploader from "./FormUI/ileUploader";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  postTitle: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email!").required("Required!"),
  experience: Yup.number(),
  studyLevel: Yup.string().required("Required!"),
  // resume: Yup.object().required("Required!"),
});

const studyLevels = {
  "No degree": "No degree",
  Bachelor: "Bachelor",
  Master: "Master",
  Phd: "Phd",
};

const FormCandidature = (props) => {

  const classes = useStyles();

  const resumeStorageRef = firebaseDb.storage().ref("Resume/");

  const candidatureRef = firebaseDb.firestore().collection("Candidature");

  let title;

  const PtitleRef = firebaseDb
    .firestore()
    .collection("OffresEmploi")
    .doc(props.match.params.id);
  PtitleRef.get().then((doc) => {
    title = doc.data();
  });

  const INITIAL_FORM_STATE = {
    firstName: "",
    lastName: "",
    postTitle: title,
    experience: "",
    studyLevel: "",
    email: "",
    resumePdf: "",
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                console.log(values);

                candidatureRef.doc(values.postTitle).set({
                  title: values.postTitle,
                  CV: values.resumePdf.name.toLowerCase(),
                  Niveau: values.studyLevel,
                  Nom: values.lastName,
                  Prenom: values.firstName,
                  Experience: values.experience,
                });

                const file = values.resumePdf;
                const fileRef = resumeStorageRef.child(file.name.toLowerCase());
                fileRef.put(file);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Job details</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldComponent name="postTitle" label="Job Post *" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Your details</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldComponent name="firstName" label="First Name *" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldComponent name="lastName" label="Last Name *" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldComponent name="email" label="E-mail *" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldComponent
                      name="experience"
                      label="Experience (years)"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      name="studyLevel"
                      label="Study Level *"
                      options={studyLevels}
                    ></Select>
                  </Grid>
                  <Grid item xs={12}>
                    <FileUploader name="resumePdf" />
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonComponent>Apply</ButtonComponent>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default FormCandidature;

