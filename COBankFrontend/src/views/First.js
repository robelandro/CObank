import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { multiStepContext } from "../Context/StepContext";
import { Alert } from "@material-ui/lab";

export default function First() {
  const { userData, setUserData, setCurrentStep } = useContext(multiStepContext);
  const [error, setError] = useState(false);
  const { firstName, lastName, Phone, DOB, gender, Address } = userData;

  const filledDetails = () => {
    if (firstName && lastName && Phone && DOB && gender && Address) {
      setCurrentStep(2);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      {error && (
        <Alert severity="error" onClose={() => setError(false)}>
          Please fill all the details
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            type="text"
            value={firstName || ""}
            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
            fullWidth
          />

          <TextField
            label="Address"
            value={Address || ""}
            onChange={(e) => setUserData({ ...userData, Address: e.target.value })}
            fullWidth
          />
          <TextField
            label="Phone Number"
            id="standard-start-adornment"
            value={Phone || ""}
            onChange={(e) => setUserData({ ...userData, Phone: e.target.value })}
            InputProps={{
              startAdornment: <InputAdornment position="start">+251</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <TextField
              label="Last Name"
              value={lastName || ""}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
              fullWidth
            />
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              value={gender || ""}
              onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
              row
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
          <TextField
            type="date"
            value={DOB || ""}
            onChange={(e) => setUserData({ ...userData, DOB: e.target.value })}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="secondary" onClick={filledDetails}>
        Next
      </Button>
    </div>
  );
}
