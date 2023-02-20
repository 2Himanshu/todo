import React, { useEffect } from 'react'
import '../App.css';
import { useState } from 'react';
import { app, database, upload } from '../firebaseConfig'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TextField, Button, Typography, Link, Box, Card, Grid, Avatar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import userDataService from '../Service/firebaseService'
function UserProfile() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [users, setUsers] = useState([]);
    const [photo, setPhoto] = useState(null); 
    const [emailID, setEmailID] = useState(null); 
    const [photoURL, setPhotoURL] = useState(
        "https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small/profile-icon-login-head-icon-vector.jpg"
    
      );
    const [loading, setLoading] = useState(false);

    const auth = getAuth();
    //   const dbInstance = collection(database,'users');
    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
        setData({ ...data, ...inputs })
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
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

    const getUsers = async () => {
  
      userDataService.getUsers(setEmailID,setUsers)
      };

    

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((res) => {
                console.log(res.user)
                toast.success("Login SuccessFul")
            })
            .catch((err) => {
                alert(err.message)
            })
    }


    const handleClick = () => {
        upload(photo, auth.currentUser, setLoading);
    }

    useEffect(() => {
        setTimeout(() => {
            if(auth.currentUser?.photoURL){
                setPhotoURL(auth.currentUser.photoURL)
                
                getUsers()
               }
        }, 1500);
        getUsers()
      }, [auth.currentUser]);

     


    return (

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Card style={{ textAlign: "center", border: "1px solid black", marginLeft: "30%", marginTop: "10%", marginRight: "30%", paddingBottom: "3%" }}>
                <Typography variant="h4" style={{ marginTop: "3%" }} >Update Profile</Typography>
                <Box style={{ textAlign: "center", marginLeft: "20%", marginTop: "5%", marginRight: "20%" }} >
                    <Grid container justify="center" alignItems="center">
                        <Avatar style={{ width: 100, height: 100 }} size='large' alt="Remy Sharp" src={photoURL} />
                        <input type={"file"} onChange={handleChange} style={{ marginTop: "13%" }} />
                        
                    </Grid>

                </Box>
                <Box style={{ textAlign: "center", marginLeft: "20%", marginTop: "5%", marginRight: "20%" }}>
                <Typography variant="h4" style={{ marginTop: "3%",fontSize: "22px" }} >Name: {users.name}</Typography>
                        <Typography variant="h4" style={{ marginTop: "3%",fontSize: "22px" }} >Contact: {users.contact}</Typography>
                <TextField  required size='small' variant="outlined" margin="normal" fullWidth onChange={(event)=>handleInputs(event)} name="email" value={emailID} disabled />
                </Box>



                <Box display="flex" flexDirection="row" style={{ marginTop: "5%" }}  >
                    <Button variant="outlined" style={{ marginTop: "3%" }} color="secondary" onClick={() => { navigate("/home") }}>TODO</Button>
                    <Button variant="contained" style={{ marginTop: "3%", marginLeft: "10%" }} color="primary" onClick={() => { handleClick() }}>UPLOAD</Button>
                </Box>
            </Card>
        </Box>


    )
}

export default UserProfile