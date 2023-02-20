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
import firebaseMethods from '../firebaseMethd/firebaseContext'
function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false);

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

        const dbInstance = collection(database, 'users');

        addDoc(dbInstance, {
          name: data.name,
          contact: data.contact,
          email: data.email,
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

  const handleSignIn = () => {

    if (data.email == "" || data.password == "") {
      toast.error("Please Enter all Data")
      return;
    }

    firebaseMethods.login(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user)
        toast.success("Login SuccessFul")
      })
      .catch((err) => {
        if (err.code == "auth/invalid-email") {
          toast.error("Please Correct Email")
        } else if (err.code == "auth/wrong-password") {
          toast.error("Please Correct Password")
        } else if (err.code == "auth/user-not-found") {
          toast.error("User Not Found")
        }
      })
  }

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) navigate("/user-profile");
    // console.log(currentUser.uid)
  })

  console.log(data)

  return (
    // <div className="App-header">
    //   <h1>Login</h1>
    //   <input className='input-fields' onChange={(event)=>handleInputs(event)} name='email' type={'text'} placeholder="Enter your email" />
    //   <input className='input-fields' onChange={(event)=>handleInputs(event)} name='password' type={'password'} placeholder="Enter your password" />
    //   {/* <button onClick={handleSubmit}>Sign Up</button> */}
    //   <button onClick={handleSignIn}>Sign In</button>
    //   <button onClick={()=>navigate('/admin-login')}>Admin Login</button>
    //   <p>Not a User? <span onClick={()=>navigate('/register')} ><a href="">Sign Up</a></span></p>
    //   <p>Forget password? <span onClick={()=>navigate('/forget-password')} ><a href="">Click Here</a></span></p>
    //   {/* <button onClick={()=>navigate('/register')}>Sign Up</button> */}
    // </div>

    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Card style={{ textAlign: "center", border: "1px solid black", marginLeft: "30%", marginTop: "10%", marginRight: "30%" }}>
        <Typography variant="h4" style={{ marginTop: "3%" }} >Login</Typography>
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
          <Typography variant="subtitle1" style={{ marginTop: "3%",textAlign: "left" }} > <Link onClick={() => navigate('/forget-password')}>Forget Password?</Link></Typography>

        </Box>

        <Button variant="outlined" style={{ marginTop: "3%",marginRight: "10%" }} color="secondary" onClick={()=>navigate('/admin-login')}>Admin Login</Button>

        <Button variant="contained" style={{ marginTop: "3%" }} color="primary" onClick={handleSignIn}>Sign In</Button>
        <Typography variant="subtitle1" style={{ marginTop: "3%" }} >Not a User? <Link onClick={() => navigate('/register')}>Sign UP</Link></Typography>
      </Card>
    </Box>


  )
}

export default Login