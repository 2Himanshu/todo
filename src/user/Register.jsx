import { useState } from 'react';
import { app, database } from '../firebaseConfig'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { Form, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TextField, Button, Typography, Link, Box, Card } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import UserDataService from '../Service/firebaseService'
import firebaseMethods from '../firebaseMethd/firebaseContext'


function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    cpass: ''
  });
  const [showPassword, setShowPassword] = useState(false);


  const auth = getAuth();
  const navigate = useNavigate();
  const dbInstance = collection(database, 'users');

  const handleInputs = (event) => {
    const inputs = { [event.target.name]: event.target.value }
    setData({ ...data, ...inputs })
  }

  const handleSubmit = () => {
    if (data.password.length < 6) {
      console.log(data.password)
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if(data.name==""){
      toast.error("Please enter name");
      return;
    }

    if(data.email==""){
      toast.error("Please enter email");
      return;
    }

    if(data.contact==""){
      toast.error("Please enter contact");
      return;
    }

    if(data.password!=data.cpass){
      toast.error("password doesn't match");
      return;
    }


    firebaseMethods.signup(data)
      .then((res) => {
        console.log(res.user);

        // add user data to firestore
        // setDoc(doc(database, "users", auth.currentUser.uid), {
        //   name: data.name,
        //   contact: data.contact,
        //   email: data.email,
        // }).then(() => {
        //   toast.success("User successfully registered");
        // }).catch((err) => {
        //   alert(err.message);
        // });
        UserDataService.addUser(data.name,data.contact,data.email).then(() => {
          toast.success("User successfully registered");
        }).catch((err) => {
          alert(err.message);
        });
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          toast.error('Email address is already in use.');
        } else if(err.code === 'auth/invalid-email') {
          toast.error('Please enter correct email');
        }
        alert(err)
      });
  };

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) navigate("/update-profile");
  })

 
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Card style={{ textAlign: "center", border: "1px solid black", marginLeft: "30%", marginTop: "10%", marginRight: "30%" }}>
        <Typography variant="h4" style={{ marginTop: "3%" }} >Register</Typography>
        
        <Box style={{ textAlign: "center", marginLeft: "20%", marginTop: "5%", marginRight: "20%" }} >
         
          <TextField required size='small' variant="outlined" margin="normal" fullWidth onChange={handleInputs} name="name" label="Name" autoFocus />
          <TextField required size='small' variant="outlined" margin="normal" fullWidth onChange={handleInputs} name="email" label="Email" />
          <TextField required size='small' variant="outlined" margin="normal" fullWidth onChange={handleInputs} name="contact" label="Contact" />
          <TextField size='small' variant="outlined" margin="normal" fullWidth onChange={handleInputs} name="password" type={showPassword ? 'text' : 'password'} // Use state variable to toggle password visibility
            label="Password"
            InputProps={{ // Add button to toggle password visibility
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              )
            }} />
          <TextField size='small' variant="outlined" margin="normal" fullWidth onChange={handleInputs} name="cpass" type={showPassword ? 'text' : 'password'} // Use state variable to toggle password visibility
            label="Confirm Password"
            InputProps={{ // Add button to toggle password visibility
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              )
            }}/>
        </Box>

        <Button variant="contained" style={{ marginTop: "3%" }} color="primary" onClick={handleSubmit}>Sign Up</Button>
        <Typography variant="subtitle1" style={{ marginTop: "3%" }} >Already a User? <Link onClick={() => navigate('/login')}>Sign In</Link></Typography>
      </Card>
    </Box>
  );
}

export default Register;
