import React, { useContext } from "react";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import {
  Grid,
  Stepper,
  Step,
  Paper,
  makeStyles,
  StepLabel,
} from "@material-ui/core";
import { multiStepContext } from "../Context/StepContext";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
      testTransform: "none",
    },
  },
  pageContent: {
    margin: theme.spacing(15),
    padding: theme.spacing(5),
  },
}));

export default function AddCustomer() {
  const { currentStep, errorMessage, setErrorMessage } = useContext(multiStepContext);
  const classes = useStyles();
  function showStep(step) {
    switch (step) {
      case 1:
        return <First />;
      case 2:
        return <Second />;
      case 3:
        return <Third />;
      default:
        return null;
    }
  }
  return (
    <Paper elevation={6} className={classes.pageContent}>
        {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage(false)}>
          {errorMessage}
        </Alert>
      )}
      <form className={classes.root} style={{ alignItems: "center" }}>
        <Grid container justifyContent="center">
          <Stepper
            style={{ width: "50%", color: "red" }}
            activeStep={currentStep - 1}
            orientation="horizontal"
          >
            <Step>
              <StepLabel>Your Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Bank Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirmation</StepLabel>
            </Step>
          </Stepper>
        </Grid>
        {showStep(currentStep)}
      </form>
    </Paper>
  );
}
