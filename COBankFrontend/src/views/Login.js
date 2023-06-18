import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AccountCircle, Lock } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    backgroundColor: "#f0f2f5",
    borderRadius: "10px",
    padding: theme.spacing(4),
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1877f2",
    color: "white",
    "&:hover": {
      backgroundColor: "#166fe5",
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password &&  phone && accountNumber) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.container}>
	  <Lock />{" Login"}
	  {error && (
        <Alert severity="error" onClose={() => setError(false)}>
          Please fill all the details and upload the file
        </Alert>
      )}
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
		    <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
			InputProps={{
				startAdornment: <InputAdornment position="start">+251</InputAdornment>,
			  }}
          />
		    <TextField 
			variant="outlined"
			margin="normal"
			required
			fullWidth
			name="accountNumber"
			label="accountNumber"
			id="accountNumber"
			value={accountNumber}
			onChange={(e) => setAccountNumber(e.target.value)}
			/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submitButton}
          >
            Finish
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Login;
