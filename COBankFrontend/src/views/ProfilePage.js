import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useCookies } from 'react-cookie';

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderTopLeftRadius: "50px",
    borderBottomRightRadius: "50px",
    background: "#ECF0F1",
    marginBottom: theme.spacing(2),
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
  const [cookie] = useCookies(['token']);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const header = { 'x-token': cookie.token };
        const response = await axios.get("http://localhost:5000/customer", { headers: header });
        console.log(response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUser();
  }, [cookie.token]);


  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>
        {Object.entries(profileData).map(([key, value]) => (
          <div className={classes.item} key={key}>
            <Typography className={classes.key}>{key}:</Typography>
            <Typography>{value}</Typography>
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ProfilePage);
