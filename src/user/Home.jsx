import React from 'react'
import '../Home.css';
import { useState, useEffect } from 'react';
import { app, database } from '../firebaseConfig'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TextField, Button, Typography, Link, Box, Card, Paper, Table, TableHead, withStyles, TableCell, TableRow, TableBody } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { todoDataService } from '../Service/firebaseService'

function Home() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    id: '',
    task: ''
  })

  const [completed, setCompleted] = useState(null)

  // const [updateVal,setUpdateval] = useState({
  //   task: ''
  // })


  const [users, setUsers] = useState([]);
  const dbInstance = collection(database, 'TodoList');


  const auth = getAuth();
  //   const dbInstance = collection(database,'users');
  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value }
    setData({ ...data, ...inputs })
  }

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user)

        const user = auth.currentUser


        addDoc(dbInstance, {
          id: data.id,
          task: data.task,
        }).then(() => {
          alert('Data Sent')
        })
          .catch((err) => {
            alert(err.message)
          })
      })
      .catch((err) => {
        alert(err.message)
      })

  }


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






  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  // onAuthStateChanged(auth, (currentUser) => {
  //   getTodo()
  // })

  const getTodo = async () => {
    const data = await getDocs(dbInstance);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  useEffect(() => {
    getTodo();
  }, []);

  const saveToDb = () => {
    todoDataService.addTodos(data, completed).then(() => {
      toast.success("Data successfully sent")
    })
      .catch((err) => {
        alert(err.message)
      })

   getTodo();
  };


  const updateData = (id) => {
    // const todoDoc = doc(dbInstance, id);
    // if (data.task == "" || completed==null) {
    //   toast.error("Please enter Data to Textfield")
    //   return;
    // }
    // const increaseage = { task: data.task, isCompleted: completed };
    // // console.log(id)
    // updateDoc(todoDoc, increaseage).then(() => {
    //   toast.success("Upadted SuccessFully")
    // }).catch((err) => {
    //   toast.error("Please enter Data to Textfield")
    // })
    todoDataService.updateTodo(id, data, completed)
    getTodo();

    console.log()
  }

  const deleteTodo = async (id) => {
    todoDataService.deleteTodo(id)
    getTodo();
  };

  const handleSignOut = async () => {
    signOut(auth).then(() => {
      toast.success("Looged Out SuccessFully")
      navigate('/login')
    })
  }

  // getTodo();

  // console.log(data)

  // console.log(users)


  return (


    <>

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Card style={{ textAlign: "center", border: "1px solid black", marginLeft: "30%", marginTop: "10%", marginRight: "30%", paddingBottom: "4%" }}>
          <Typography variant="h4" style={{ marginTop: "3%" }} >TODO</Typography>
          <Box style={{ textAlign: "center", marginLeft: "20%", marginTop: "5%", marginRight: "20%" }} >
            <TextField required size='small' variant="outlined" margin="normal" fullWidth onChange={(event) => handleInputs(event)} name="id" label="ID" />
            <TextField required size='small' variant="outlined" margin="normal" fullWidth name='task' onChange={(event) => handleInputs(event)} type={'text'} // Use state variable to toggle password visibility
              label="TASK"
            />
            <Box display="flex" flexDirection="row" >
              <input type="radio" id="gender" name="task" onClick={() => setCompleted(true)} value="true" />  <Typography variant="" style={{ marginTop: "3%" }} >Completed</Typography>
              <input type="radio" id="gender" name="task" onClick={() => setCompleted(false)} value="false" /><Typography variant="" style={{ marginRight: "10%" }} >Not Completed</Typography> <br />
            </Box>

          </Box>
          <Button variant="outlined" style={{ marginTop: "3%", }} color="secondary" onClick={() => {
            handleSignOut()
          }}>Sign Out</Button>
          <Button variant="contained" style={{ marginTop: "3%", marginLeft: "6%" }} color="primary" onClick={saveToDb}>ADD</Button>
        </Card>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Card style={{ textAlign: "center", border: "1px solid black", marginLeft: "20%", marginTop: "5%", marginRight: "20%" }}>
          <Typography variant="h4" style={{ marginTop: "3%" }} >TODO LIST</Typography>

          <Paper >
            <Table >
              <TableHead>
                <TableRow>
                  <CustomTableCell style={{ color: "white" }} align="center">ID</CustomTableCell>
                  <CustomTableCell style={{ color: "white" }} align="center">TASK</CustomTableCell>
                  <CustomTableCell style={{ color: "white" }} align="center">Status</CustomTableCell>
                  <CustomTableCell style={{ color: "white" }} align="center">Update</CustomTableCell>
                  <CustomTableCell style={{ color: "white" }} align="center">Delete</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => {
                  if (user.userId === auth.currentUser.uid)
                    return (
                      <TableRow>
                        {/* <CustomTableCell component="th" scope="row">
                        </CustomTableCell> */}
                        <CustomTableCell align="center">{user.todoid}</CustomTableCell>
                        <CustomTableCell align="center">{user.task}</CustomTableCell>
                        <CustomTableCell align="center">{(user.isCompleted) ? "Completed" : "pending"}</CustomTableCell>
                        <CustomTableCell align="center"><Button variant="outlined" color="primary" onClick={() => updateData(user.id)} >Update</Button></CustomTableCell>
                        <CustomTableCell align="center"><Button variant="outlined" color="secondary" onClick={() => deleteTodo(user.id)} >Delete</Button></CustomTableCell>
                        {/* <CustomTableCell align="right">{row.protein}</CustomTableCell> */}
                      </TableRow>
                    )
                })}
              </TableBody>
            </Table>
          </Paper>
        </Card>

      </Box>


    </>

  )
}

export default Home