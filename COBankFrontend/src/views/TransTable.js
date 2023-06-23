import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { multiStepContext } from "../Context/StepContext";
import { useCookies } from "react-cookie";

const useStyles = makeStyles({
  root: {
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonGroup: {
    marginBottom: "50px",
  },
  button: {
    margin: "5px",
  },
});

export default function TransTable() {
  const [data, setData] = useState([]);
  const [isDepositDialogOpen, setDepositDialogOpen] = useState(false);
  const [isTransferDialogOpen, setTransferDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const { userType } = useContext(multiStepContext);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [toAccountNumber, setToAccountNumber] = useState("");
  const [userID, setUserID] = useState("");
  const classes = useStyles();
  const [cookie] = useCookies(["token"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = { "x-token": cookie.token };
        const res = await axios.get("http://localhost:5000/transactions", {
          headers: header,
        });
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [cookie.token]);

  const handleDepositDialogOpen = () => {
    setDepositDialogOpen(true);
  };

  const handleDepositDialogClose = () => {
    setDepositDialogOpen(false);
  };

  const handleTransferDialogOpen = () => {
    setTransferDialogOpen(true);
  };

  const handleTransferDialogClose = () => {
    setTransferDialogOpen(false);
  };

  const handleWithdrawDialogOpen = () => {
    setWithdrawDialogOpen(true);
  };

  const handleWithdrawDialogClose = () => {
    setWithdrawDialogOpen(false);
  };

  const handleDepositSubmit = async () => {
    try {
      const data = {
        amount: amount,
        description: description,
        userID: userID,
      };
      const header = { "x-token": cookie.token };
      const res = await axios.put("http://localhost:5000/deposit", data, {
        headers: header,
      });
      console.log(res.data);
      setDepositDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTransferSubmit = async () => {
    try {
      const data = {
        amount: amount,
        description: description,
        userID: userID,
        toAccountNumber: toAccountNumber,
      };
      const header = { "x-token": cookie.token };
      const res = await axios.put("http://localhost:5000/transfer", data, {
        headers: header,
      });
      console.log(res.data);
      setTransferDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdrawSubmit = async () => {
    try {
      const data = {
        amount: amount,
        description: description,
        userID: userID,
      };
      const header = { "x-token": cookie.token };
      const res = await axios.put("http://localhost:5000/withdraw", data, {
        headers: header,
      });
      console.log(res.data);
      setWithdrawDialogOpen(false);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.buttonGroup}>
        {userType !== "client" && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDepositDialogOpen}
              className={classes.button}
            >
              Deposit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleWithdrawDialogOpen}
              className={classes.button}
            >
              Withdraw
            </Button>
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleTransferDialogOpen}
          className={classes.button}
        >
          Transfer
        </Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(data[0] || {}).map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Deposit Dialog */}
      <Dialog open={isDepositDialogOpen} onClose={handleDepositDialogClose}>
        <DialogTitle>Deposit</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="UserID"
            fullWidth
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDepositSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={handleDepositDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={isTransferDialogOpen} onClose={handleTransferDialogClose}>
        <DialogTitle>Transfer</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {userType !== "client" && (
            <TextField
              label="UserID"
              fullWidth
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
            />
          )}
          <TextField
            label="To Account Number"
            fullWidth
            value={toAccountNumber}
            onChange={(e) => setToAccountNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTransferSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={handleTransferDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawDialogOpen} onClose={handleWithdrawDialogClose}>
        <DialogTitle>Withdraw</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="UserID"
            fullWidth
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWithdrawSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={handleWithdrawDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
