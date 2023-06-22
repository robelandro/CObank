import React from "react";
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

const NotFound = ({ classes }) => {

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography className={classes.item} variant="h5" gutterBottom>
          Not Found Page
        </Typography>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(NotFound);
