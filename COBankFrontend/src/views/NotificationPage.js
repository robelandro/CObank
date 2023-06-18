import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#1877f2',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: '#f0f2f5',
  },
  tableCell: {
    color: '#333333',
    fontWeight: 'bold',
  },
  link: {
    color: '#1877f2',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function NotificationPage() {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/notification'); // Replace '/notification' with the actual API endpoint
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Notifications
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.tableCell}>From Name</TableCell>
              <TableCell className={classes.tableCell}>To Be</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/notification/${notification.id}/detail`} className={classes.link}>
                    {notification.fromName}
                  </Link>
                </TableCell>
                <TableCell>{notification.toBe}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
