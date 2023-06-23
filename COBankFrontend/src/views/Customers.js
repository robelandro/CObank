import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#839192",
    color: "white",
    borderBottomLeftRadius: "50px",
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 50,
    margin: "100px auto 200px",
    width: "70%",
  },
});

export default function Customers() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [cookie, ] = useCookies(['token']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = { 'x-token': cookie.token };
        const response = await axios.get("http://localhost:5000/client", { headers: header });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cookie.token]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S No.</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Date of Birth</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Account Type</StyledTableCell>
              <StyledTableCell>Employment</StyledTableCell>
              <StyledTableCell align="right">Transfer</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((customer, index) => {
              return (
                <StyledTableRow key={customer._id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{`${customer.firstName} ${customer.lastName}`}</StyledTableCell>
                  <StyledTableCell>{customer.Phone}</StyledTableCell>
                  <StyledTableCell>{customer.Address}</StyledTableCell>
                  <StyledTableCell>{customer.email}</StyledTableCell>
                  <StyledTableCell>{customer.DOB}</StyledTableCell>
                  <StyledTableCell>{customer.status}</StyledTableCell>
                  <StyledTableCell>{customer.gender}</StyledTableCell>
                  <StyledTableCell>{customer.accountType}</StyledTableCell>
                  <StyledTableCell>{customer.employment}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Link to={`/customers/${customer._id}`}>
                      <Button variant="contained" color="primary">
                        Transfer
                      </Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
