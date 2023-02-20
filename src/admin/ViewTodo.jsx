import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebaseConfig';
import { TextField, Button, Typography, Link, Box, Card, Paper, Table, TableHead, withStyles, TableCell, TableRow, TableBody } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { getAuth } from 'firebase/auth';
const ViewTodo = () => {

  const dbInstance = collection(database, 'TodoList');
  const [todo, setTodo] = useState([])
  const navigate = useNavigate();



  useEffect(() => {
    const getTodo = async () => {
      const data = await getDocs(dbInstance);
      setTodo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTodo();
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
      //   <h1>All Todos</h1>
      //   <table style={tableStyles}>
      //   <thead>
      //     <tr>
      //       <th style={headerStyles}>ID</th>
      //       <th style={headerStyles}>Task</th>
      //       <th style={headerStyles}>user ID</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {todo.map((user) => (
      //       <tr key={user.id} style={rowStyles}>
      //         <td style={cellStyles}>{user.todoid}</td>
      //         <td style={cellStyles}>{user.task}</td>
      //         <td style={cellStyles}>{user.userId}</td>
      //       </tr>
      //     ))}
      //   </tbody>
      // </table>
      //       <button onClick={()=>navigate('/admin-dashboard')}>View Users</button>
      // </div>

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Card style={{ textAlign: "center", border: "1px solid black", marginLeft: "20%", marginTop: "5%", marginRight: "20%",paddingBottom: "3%" }}>
        <Typography variant="h4" style={{ marginTop: "3%" }} >TODO LIST</Typography>

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
              {todo.map((user) => {
                
                  return (
                    <TableRow>
                      {/* <CustomTableCell component="th" scope="row">
                      </CustomTableCell> */}
                      <CustomTableCell align="center">{user.todoid}</CustomTableCell>
                      <CustomTableCell align="center">{user.task}</CustomTableCell>
                      <CustomTableCell align="center">{(user.isCompleted)?"completed":"pending"}</CustomTableCell>
                     
                      {/* <CustomTableCell align="right">{row.protein}</CustomTableCell> */}
                    </TableRow>
                  )
              })}
            </TableBody>
          </Table>
        </Paper>
        <Button variant="outlined" style={{ marginTop: "3%",marginLeft: "6%" }} color="secondary" onClick={()=>navigate('/admin-login')}>Sign Out</Button>

        <Button variant="contained" style={{ marginTop: "3%",marginLeft: "6%" }} color="primary" onClick={()=>navigate('/admin-dashboard')}>View Users</Button>

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
  export default ViewTodo;
