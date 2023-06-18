import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

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

const AdditionalInfo = () => {
  const classes = useStyles();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password && confirmPassword && file === null) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("/api/upload", formData, {
          onUploadProgress: (e) => {
            setProgress(Math.round((e.loaded * 100) / e.total));
          },
        })
        .then((res) => {
          console.log(res.data);
          alert("File uploaded successfully");
        })
        .catch((err) => {
          console.error(err);
          alert("File upload failed");
        });
    } else {
      alert("Please select a file");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.container}>
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
            Upload Residance ID Document
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
          {progress > 0 && (
            <LinearProgress variant="determinate" value={progress} />
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
