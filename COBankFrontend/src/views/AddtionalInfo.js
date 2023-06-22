import { useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useCookies } from 'react-cookie';

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

const AdditionalInfo = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(false);
  const [, setCookie] = useCookies(['token']);

  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
      return () => URL.revokeObjectURL(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }, [file]);  

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword || !file) {
      setError(true);
      return;
    }

    setError(false);
    const encodedString = Buffer.from(
      `${props.location.state.id}:${password}`
    ).toString("base64");
    const headers = { Authorization: `Basic ${encodedString}` };

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const encodeFile = Buffer.from(reader.result).toString("base64");
        const data = {
          name: file.name,
          type: "image",
          isPublic: true,
          data: encodeFile,
        };
        const response = await axios.post(
          "http://localhost:5000/addtional",
          data,
          { headers }
        );
        console.log(response.data);
        // Store the token in a cookie
        let expires = new Date();
        expires.setTime(expires.getTime() + (response.data.expires_in * 1000));
        setCookie('token', response.data.token, { path: '/', expires });
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.container}>
        {error && (
          <Alert severity="error" onClose={() => setError(false)}>
            Please fill all the details and upload the file.
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
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            className={classes.submitButton}
            component="label"
          >
            Upload Residence ID Document
            <AttachFileIcon />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {file && <p>{file.name}</p>}
          {preview && (
            <Box mt={2}>
              <img
                src={preview}
                alt="File Preview"
                style={{ width: "200px", height: "auto" }}
              />
            </Box>
          )}
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

export default AdditionalInfo;
