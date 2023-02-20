import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebaseConfig';
import { TextField, Button, Typography, Link, Box, Card, Paper, Table, TableHead, withStyles, TableCell, TableRow, TableBody } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { getAuth } from 'firebase/auth';
const AdminDashboard = () => {

  const dbInstance = collection(database, 'users');
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const auth= getAuth()


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(dbInstance);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);


  const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });

  return (
      // <div>
      //   <h1>User Data</h1>
      //   <table style={tableStyles}>
      //   <thead>
      //     <tr>
      //       <th style={headerStyles}>Username</th>
      //       <th style={headerStyles}>Email</th>
      //       <th style={headerStyles}>Contact</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {users.map((user) => (
      //       <tr key={user.id} style={rowStyles}>
      //         <td style={cellStyles}>{user.name}</td>
      //         <td style={cellStyles}>{user.email}</td>
      //         <td style={cellStyles}>{user.contact}</td>
      //       </tr>
      //     ))}
      //   </tbody>
      // </table>
      //       <button onClick={()=>navigate('/view-todo')}>View Todo</button>
      // </div>

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Card style={{ textAlign: "center", border: "1px solid black", marginLeft: "20%", marginTop: "5%", marginRight: "20%",paddingBottom: "3%" }}>
        <Typography variant="h4" style={{ marginTop: "3%" }} >Users List</Typography>

        <Paper >
          <Table >
            <TableHead>
              <TableRow>
                <CustomTableCell  style={{color: "white"}} align="center">Name</CustomTableCell>
                <CustomTableCell style={{color: "white"}} align="center">Email</CustomTableCell>
                <CustomTableCell style={{color: "white"}} align="center">Contact</CustomTableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                
                  return (
                    <TableRow>
                      {/* <CustomTableCell component="th" scope="row">
                      </CustomTableCell> */}
                      <CustomTableCell align="center">{user.name}</CustomTableCell>
                      <CustomTableCell align="center">{user.email}</CustomTableCell>
                      <CustomTableCell align="center">{user.contact}</CustomTableCell>
                     
                      {/* <CustomTableCell align="right">{row.protein}</CustomTableCell> */}
                    </TableRow>
                  )
              })}
            </TableBody>
          </Table>
        </Paper>
        <Button variant="outlined" style={{ marginTop: "3%",marginLeft: "6%" }} color="secondary" onClick={()=>navigate('/admin-login')}>Sign Out</Button>

        <Button variant="contained" style={{ marginTop: "3%",marginLeft: "6%" }} color="primary" onClick={()=>navigate('/view-todo')}>View Todo</Button>

      </Card>



    </Box>
      
    );
  };
  
  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
  };
  
  const headerStyles = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    backgroundColor: '#dddddd',
  };
  
  const rowStyles = {
    border: '1px solid #dddddd',
  };
  
  const cellStyles = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  };
  export default AdminDashboard;
