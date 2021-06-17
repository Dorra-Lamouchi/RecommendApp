import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextFieldComponent from "./FormUi/textFieldComponent";
import { Grid, makeStyles, Container, Typography } from "@material-ui/core";
import firebaseDb from "../../firebase";
import Select from "./FormUi/Select";
import DateTimePicker from "./FormUi/dateTimePicker";
import ButtonComponent from "./FormUi/buttonComponent";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  postTitle: "",
  experience: "",
  studyLevel: "",
  email: "",
  room: "",
  interviewDate: "",
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  postTitle: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email!").required("Required!"),
  room: Yup.string().required("Required!"),
  interviewDate: Yup.date().required("Required!"),
});

const Acceptation = () => {
  const [rooms, setRooms] = useState({});
  const ref = firebaseDb.firestore().collection("Enterprises");

  const getRooms = () => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        if (doc.id === "FFT") {
          items.push(doc.data());
        }
      });
      setRooms(items[0]);
      console.log(items);
    });
  };

  useEffect(() => {
    getRooms();
  }, []);

  const classes = useStyles();
  const acceptationRef = firebaseDb.firestore().collection("Accepted");
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
                acceptationRef.doc(values.postTitle).set({
                  nom: values.lastName,
                  poste: values.postTitle,
                  exp: values.experience,
                  niveau: values.studyLevel,
                  mail: values.email,
                  room: values.room,
                  dateInter: values.interviewDate,
                });
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Job details</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldComponent name="postTitle" label="Job Post" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Candidate details</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldComponent name="firstName" label="First Name" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldComponent name="lastName" label="First Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldComponent name="email" label="E-mail" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Interview details</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Select name="room" label="Select Room" options={rooms} />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      name="interviewDate"
                      label="Interview date"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonComponent>Confirm</ButtonComponent>
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

export default Acceptation;
