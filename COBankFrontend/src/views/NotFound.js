import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
  },
  icon: {
    fontSize: 80,
    marginBottom: theme.spacing(2),
  },
});

const NotFound = ({ classes }) => {
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h4" gutterBottom>
          Oops!
        </Typography>
        <SentimentVeryDissatisfiedIcon className={classes.icon} />
        <Typography className={classes.subtitle} variant="h6" gutterBottom>
          We couldn't find the page you're looking for.
        </Typography>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(NotFound);
