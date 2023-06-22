import React, { useState } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Lock } from "@material-ui/icons";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [, setCookie] = useCookies(["token"]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password || !phone) {
      setError(true);
    } else {
      try {
        const encodedString = Buffer.from(`+251${phone}:${password}`).toString(
          "base64"
        );
        const headers = { Authorization: `Basic ${encodedString}` };
        const response = await axios.get("http://localhost:5000/connect", {
          headers,
        });
        console.log(response.data);
        let expires = new Date();
        expires.setTime(expires.getTime() + response.data.expires_in * 1000);
        setCookie("token", response.data.token, { path: "/", expires });
        history.push("/");
        setError(false);
      } catch (err) {
        setError(true);
        if (err.response) {
          console.log(err.response.data);
          setErrorMessage(err.response.data.error);
        } else {
          console.log(err.message);
          setErrorMessage(err.message);
        }
      } finally {
      }
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Lock />
        {" Login"}
        {error && (
          <Alert severity="error" onClose={() => setError(false)}>
            {errorMessage}
          </Alert>
        )}
        <form className={classes.form} onSubmit={handleLogin}>
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
              startAdornment: (
                <InputAdornment position="start">+251</InputAdornment>
              ),
            }}
          />
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
