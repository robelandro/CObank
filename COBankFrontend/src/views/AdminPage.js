import React, { useEffect, useState } from 'react';
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
  Paper,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10),
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
  tableContainer: {
    marginBottom: theme.spacing(2),
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const AdminPage = () => {
  const classes = useStyles();
  const [staffData, setStaffData] = useState([]);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/staff');
      console.log(response.data);
      setStaffData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setName('');
    setPosition('');
  };

  const handleRemoveDialogOpen = () => {
    setRemoveDialogOpen(true);
  };

  const handleRemoveDialogClose = () => {
    setRemoveDialogOpen(false);
  };

  const handleAddStaff = async () => {
    try {
      const encodedString = Buffer.from(`+251${name}:${position}`).toString(
        "base64"
      );
      const headers = { Authorization: `Basic ${encodedString}` };
      await axios.post('http://localhost:5000/users', null, {headers});
      fetchStaffData();
      handleAddDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveStaff = async () => {
    try {
      await axios.delete('http://localhost:5000/remstaff', {data: {name}});
      fetchStaffData();
      handleRemoveDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4" gutterBottom>
        Admin Page
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        className={classes.addButton}
        onClick={handleAddDialogOpen}
      >
        Add Staff
      </Button>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        className={classes.addButton}
        onClick={handleRemoveDialogOpen}
      >
        Remove Staff
      </Button>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>User Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.map((staff) => (
              <TableRow key={staff._id}>
                <TableCell>{staff._id}</TableCell>
                <TableCell>{staff.Phone}</TableCell>
                <TableCell>{staff.password}</TableCell>
                <TableCell>{staff.userType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Staff Dialog */}
      <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add Staff</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Phone Number"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Password"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStaff} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove Staff Dialog */}
      <Dialog open={isRemoveDialogOpen} onClose={handleRemoveDialogClose}>
        <DialogTitle>Remove Staff</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Id from the table"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveStaff} color="secondary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPage;
