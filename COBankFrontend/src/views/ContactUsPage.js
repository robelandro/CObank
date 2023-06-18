import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  form: {
    width: "100%",
    maxWidth: 400,
    marginTop: theme.spacing(2),
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(2),
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ContactUsPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [complaint, setComplaint] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    // Simulating API call with a setTimeout
    setTimeout(() => {
      // Check if submission is successful
      const isSubmissionSuccessful = false; // Change this based on your API response
      if (isSubmissionSuccessful) {
        setAlertMessage("Submission successful!");
        setAlertSeverity("success");
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          history.push("/");
        }, 2000);
      } else {
        setAlertMessage("Submission failed. Please try again.");
        setAlertSeverity("error");
      }
      // Reset form fields
      setName("");
      setSubject("");
      setComplaint("");
    }, 1500);
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      {alertMessage && (
        <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
          {alertMessage}
        </Alert>
      )}
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          label="Complaint"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ContactUsPage;
