import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  InputLabel,
  Radio,
  MenuItem,
  Select as MuiSelect,
  Button,
} from "@material-ui/core";
import { multiStepContext } from "../Context/StepContext";
import { Alert } from "@material-ui/lab";

export default function Second() {
  const { userData, setUserData, setCurrentStep } = useContext(multiStepContext);
  const [error, setError] = useState(false);
  const { name, email, employment, accountType } = userData;

  const filledDetails = () => {
    if (name && email && employment && accountType) {
      setCurrentStep(3);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      {error && (
        <Alert severity="error">Please fill all the details</Alert>
      )}
      <Grid container>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            label="Account Name"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            value={name}
            color="white"
          />
          <TextField
            label="E-mail"
            type="email"
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            value={email}
            color="secondary"
          />
          <FormControl>
            <FormLabel>Employment Status</FormLabel>
            <MuiRadioGroup
              row
              onChange={(e) => setUserData({ ...userData, employment: e.target.value })}
              value={employment}
            >
              <FormControlLabel value="Student" control={<Radio />} label="Student" />
              <FormControlLabel value="Employed" control={<Radio />} label="Employed" />
              <FormControlLabel value="UnEmployed" control={<Radio />} label="UnEmployed" />
              <FormControlLabel value="Retired" control={<Radio />} label="Retired" />
            </MuiRadioGroup>
          </FormControl>
        </Grid>
        <Grid items xs={6}>
          <FormControl>
            <InputLabel>Account-Type</InputLabel>
            <MuiSelect
              onChange={(e) => setUserData({ ...userData, accountType: e.target.value })}
              value={accountType}
            >
              <MenuItem value="Current Account">Current Account</MenuItem>
              <MenuItem value="Savings Account">Savings Account</MenuItem>
            </MuiSelect>
          </FormControl>
        </Grid>
        <Button variant="contained" color="primary" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
        <Button variant="contained" color="secondary" onClick={filledDetails}>
          Next
        </Button>
      </Grid>
    </div>
  );
}
