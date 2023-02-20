import React from 'react'
import './App.css';
import { useState } from 'react';
import {app,database} from './firebaseConfig'
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth'
import { collection,addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Link, Box, Card } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import firebaseMethods from './firebaseMethd/firebaseContext'
import { toast } from 'react-hot-toast';
function ForgetPassword() {

    const navigate = useNavigate();

    const [data,setData] = useState({
        email: '',
        password: ''
      })
      const auth = getAuth();
    //   const dbInstance = collection(database,'users');
      const handleInputs = (event) => {
        let inputs = {[event.target.name]: event.target.value}
        setData({...data,...inputs})
      }
    
      const handleSubmit = () => {
        createUserWithEmailAndPassword(auth,data.email,data.password)
        .then((res)=>{
          console.log(res.user)

          const user = auth.currentUser

          const dbInstance = collection(database,'users');

          addDoc(dbInstance,{
            name: data.name,
            contact: data.contact,
            email: data.email,
          }).then(()=>{
            alert('Data Sent')
          })
          .catch((err)=>{
            alert(err.message)
          })
        })
        .catch((err)=>{
          alert(err.message)
        })
        
      }
    
      const handleReset=()=>{
        firebaseMethods.resetPassword(auth,data.email).then(()=>{
          toast.success("Reset Link sent check inbox");
        }).catch((err)=>{
            alert(err.message)
        })
      }

    //   onAuthStateChanged(auth, (currentUser) => {
    //     if (currentUser) navigate("/dashboard");
    //     // console.log(currentUser.uid)
    //   })

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Card style={{ textAlign: "center", border: "1px solid black", marginLeft: "30%", marginTop: "10%", marginRight: "30%" ,paddingBottom: "3%"}}>
        <Typography variant="h4" style={{ marginTop: "3%" }} >Forget Password</Typography>
        <Box style={{ textAlign: "center", marginLeft: "20%", marginTop: "5%", marginRight: "20%" }} >
          <TextField required size='small' variant="outlined" margin="normal" fullWidth onChange={(event)=>handleInputs(event)} name="email" label="Email" />
          
         
        </Box>

        <Button variant="contained" style={{ marginTop: "3%" }} color="primary" onClick={handleReset} >Submit</Button>
      </Card>
    </Box>
  )
}

export default ForgetPassword