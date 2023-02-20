import React from 'react'
import '../App.css';
import { useState } from 'react';
import { app, database } from '../firebaseConfig'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TextField, Button, Typography, Link, Box, Card } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
function AdminLogin() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false);


  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value }
    setData({ ...data, ...inputs })
  }



  const handleSignIn = () => {
    console.log(data)
    if (data.email !== 'test@test.com' || data.password !== 'pass@123') {
      toast.error("Invalid Email or Password.")
      return;
    }
    if (data.email === 'test@test.com' && data.password === 'pass@123') {
      navigate('/admin-dashboard')
    }
  }


  return (
    // <div className="App-header">
    //   <h1>Admin Login</h1>
    //   <input className='input-fields' onChange={(event)=>handleInputs(event)} name='email' type={'text'} placeholder="Enter your email" />
    //   <input className='input-fields' onChange={(event)=>handleInputs(event)} name='password' type={'password'} placeholder="Enter your password" />
    //   {/* <button onClick={handleSubmit}>Sign Up</button> */}
    //   <button onClick={handleSignIn}>Sign In</button>
    // </div>

    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Card style={{ textAlign: "center", border: "1px solid black", marginLeft: "30%", marginTop: "10%", marginRight: "30%",paddingBottom: "3%" }}>
        <Typography variant="h4" style={{ marginTop: "3%" }} >Admin Login</Typography>
        <Box style={{ textAlign: "center", marginLeft: "20%", marginTop: "5%", marginRight: "20%" }} >
          <TextField required size='small' variant="outlined" margin="normal" fullWidth onChange={(event) => handleInputs(event)} name="email" label="Email" />
          <TextField size='small' variant="outlined" margin="normal" fullWidth name='password' onChange={(event) => handleInputs(event)} type={showPassword ? 'text' : 'password'} // Use state variable to toggle password visibility
            label="Password"
            InputProps={{ // Add button to toggle password visibility
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              )
            }} />

        </Box>

        

        <Button variant="contained" style={{ marginTop: "3%" }} color="primary" onClick={handleSignIn}>Sign In</Button>
      </Card>
    </Box>

  )
}

export default AdminLogin