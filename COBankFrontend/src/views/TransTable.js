import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { multiStepContext } from "../Context/StepContext";

// Define some custom styles using makeStyles hook
const useStyles = makeStyles({
  root: {
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonGroup: {
    marginBottom: '50px',
  },
  button: {
    margin: '5px',
  },
});

export default function TransTable() {
  const [data, setData] = useState([]);
  const [isDepositDialogOpen, setDepositDialogOpen] = useState(false);
  const [isTransferDialogOpen, setTransferDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const { userType } = useContext(multiStepContext);

  // Use the custom styles
  const classes = useStyles();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getTransaction'); // Replace '/data' with the actual API endpoint
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <div className={classes.root}>
      <div className={classes.buttonGroup}>
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
          onClick={handleTransferDialogOpen}
          className={classes.button}
        >
          Transfer
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleWithdrawDialogOpen}
          className={classes.button}
        >
          Withdraw
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
          <TextField label="Money Box" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDepositDialogClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={isTransferDialogOpen} onClose={handleTransferDialogClose}>
        <DialogTitle>Transfer</DialogTitle>
        <DialogContent>
          <TextField label="Money" fullWidth />
          <TextField label="Reason" fullWidth />
          <TextField label="To Account Number" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTransferDialogClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawDialogOpen} onClose={handleWithdrawDialogClose}>
        <DialogTitle>Withdraw</DialogTitle>
        <DialogContent>
          <TextField label="Money" fullWidth />
          <TextField label="Reason" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWithdrawDialogClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
