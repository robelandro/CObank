import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "#f0f2f5",
		borderRadius: "10px",
		padding: theme.spacing(4),
		boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
	  },
  title: {
    color: "#1877f2",
    fontWeight: "bold",
    textAlign: "center",
    margin: theme.spacing(2),
  },
  table: {
    minWidth: 650,
	borderRadius: "10px",
	boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  tableHead: {
    backgroundColor: "#f0f2f5",
  },
  tableCell: {
    color: "#333333",
    fontWeight: "bold",
	backgroundColor: "#AED6F1",
  },
}));

const ApiPage = () => {
  const classes = useStyles();
  const apiEndpoints = [
    { method: "GET", endpoint: "/login", description: "Get login details" },
    { method: "PUT", endpoint: "/user", description: "Update user information" },
    { method: "GET", endpoint: "/user", description: "Get user information" },
    { method: "POST", endpoint: "/user", description: "Create a new user" },
    { method: "PUT", endpoint: "/add", description: "Update an addition" },
    { method: "PUT", endpoint: "/customerService", description: "Update customer service information" },
    { method: "GET", endpoint: "/profile", description: "Get user profile" },
    { method: "GET", endpoint: "/notification", description: "Get user notifications" },
    { method: "PUT", endpoint: "/transaction", description: "Update a transaction" },
    { method: "GET", endpoint: "/transaction", description: "Get transaction details" },
    { method: "POST", endpoint: "/transaction", description: "Create a new transaction" },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        API Reference
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.tableCell}>Method</TableCell>
              <TableCell className={classes.tableCell}>Endpoint</TableCell>
              <TableCell className={classes.tableCell}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiEndpoints.map((endpoint, index) => (
              <TableRow key={index}>
                <TableCell>{endpoint.method}</TableCell>
                <TableCell>{endpoint.endpoint}</TableCell>
                <TableCell>{endpoint.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ApiPage;
