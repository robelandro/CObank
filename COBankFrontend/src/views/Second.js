import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  Radio,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import { multiStepContext } from "../Context/StepContext";
import { Alert } from "@material-ui/lab";

export default function Second() {
  const { userData, setUserData, setCurrentStep, setErrorMessage } = useContext(multiStepContext);
  const [error, setError] = useState(false);
  const { email, employment, accountType } = userData;

  const filledDetails = () => {
    if (email && employment && accountType) {
      setCurrentStep(3);
    } else {
      setError(true);
    }
  };

  const onBack = () => {
    setCurrentStep(1);
    setErrorMessage(false);
  }

  return (
    <div>
      {error && <Alert severity="error">Please fill all the details</Alert>}
      <Grid container>
        <Grid item xs={6}>
          <TextField
            label="E-mail"
            type="email"
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            value={email || ""}
            color="secondary"
          />
          <FormControl>
            <FormLabel>Employment Status</FormLabel>
            <RadioGroup
              row
              onChange={(e) => setUserData({ ...userData, employment: e.target.value })}
              value={employment || ""}
            >
              <FormControlLabel value="Student" control={<Radio />} label="Student" />
              <FormControlLabel value="Employed" control={<Radio />} label="Employed" />
              <FormControlLabel value="UnEmployed" control={<Radio />} label="UnEmployed" />
              <FormControlLabel value="Retired" control={<Radio />} label="Retired" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <InputLabel>Account-Type</InputLabel>
            <Select
              onChange={(e) => setUserData({ ...userData, accountType: e.target.value })}
              value={accountType || ""}
            >
              <MenuItem value="Current Account">Current Account</MenuItem>
              <MenuItem value="Savings Account">Savings Account</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={onBack}>
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="secondary" onClick={filledDetails}>
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
