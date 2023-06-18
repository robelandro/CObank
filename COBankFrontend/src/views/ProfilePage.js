import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderTopLeftRadius: "50px",
    borderBottomRightRadius: "50px",
    background: "#ECF0F1",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  key: {
    fontWeight: "bold",
  },
});

const ProfilePage = ({ classes }) => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    axios.get("/user").then((response) => {
      setProfileData(response.data);
    });
  }, []);

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>
        <div className={classes.item}>
          <Typography className={classes.key}>Name:</Typography>
          <Typography>{profileData.name}</Typography>
        </div>
        <div className={classes.item}>
          <Typography className={classes.key}>Email:</Typography>
          <Typography>{profileData.email}</Typography>
        </div>
        <div className={classes.item}>
          <Typography className={classes.key}>Address:</Typography>
          <Typography>{profileData.address}</Typography>
        </div>
        {/* Add more profile fields as needed */}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ProfilePage);
