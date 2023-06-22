import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import { multiStepContext } from "../Context/StepContext";

const useStyles = makeStyles({
  label: {
    color: "#006064",
    fontWeight: "bold",
  },
});

export default function Third() {
  const { userData, setCurrentStep, submitData, setErrorMessage } = useContext(multiStepContext);
  const classes = useStyles();

  const onBack = () => {
    setCurrentStep(2);
    setErrorMessage(false);
  }

  const renderTableRow = (label, value) => (
    <TableRow>
      <TableCell className={classes.label} component="th" scope="row">
        {label}
      </TableCell>
      <TableCell align="right">{value}</TableCell>
    </TableRow>
  );

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Categories</TableCell>
                  <TableCell align="right">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderTableRow("First Name", userData.firstName)}
                {renderTableRow("Last Name", userData.lastName)}
                {renderTableRow("Address", userData.Address)}
                {renderTableRow("Gender", userData.gender)}
                {renderTableRow("Phone Number", userData.Phone)}
                {renderTableRow("DOB", userData.DOB)}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Categories</TableCell>
                  <TableCell align="right">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderTableRow("Account Type", userData.accountType)}
                {renderTableRow("E-mail", userData.email)}
                {renderTableRow("Employment Status", userData.employment)}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={onBack}>
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="secondary" onClick={submitData}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
