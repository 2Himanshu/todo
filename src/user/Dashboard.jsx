import React, { useEffect } from 'react'
import '../App.css';
import { useState } from 'react';
import { app, database } from '../firebaseConfig'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function DashBoard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([])

  const [textField, setTextField] = useState({
    name: '',
    contact: '',
    email: ''
  })

  const dbInstance = collection(database, 'users');

  const handleInputs = (event) => {
    let inputs = {[event.target.name]: event.target.value}
    setTextField({...textField,...inputs})
  }

  const updateProfile = (id) => {
    const userDoc = doc(dbInstance,id);
    const updatedUser = { name: textField.name, contact: textField.contact};
    updateDoc(userDoc, updatedUser).then(()=>{
      alert("data updated successfully")
    });
  }
  const auth = getAuth();


  const getUsers = async () => {
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(database, "cities", auth.currentUser.uid);
        getDoc(docRef).then((doc) => {
          if (doc.exists()) {
            setUsers({ ...doc.data(), id: doc.id });
          } else {
            console.log("No such document!");
          }
        });
      }
    });
  };

  

  useEffect(() => {
    
    getUsers();
  }, []);

  // console.log(auth.currentUser.uid)


  return (
    <div>
      <h1>User Details</h1>
      {/* {users.filter(user => user.email === auth.currentUser.email).map((user, index) => ( */}
        <div>
          {console.log(users.email,'email id')}
          <h3>Name: {users.name}</h3>
          {/* <input type="text" defaultValue={users.email} placeholder='enter name to update'  onChange={(e) => handleInputs(e)} name="name"/> */}
          <h3>Contact: {users.contact}</h3>
          {/* <input type="text" defaultValue={users.email} placeholder='enter contact to update'  onChange={(e) => handleInputs(e)}  name="contact"/> */}
          <h3>Email</h3>
          <input type="text" value={users.email} onChange={(e) => handleInputs(e)} name="email"/>
          <br />
      <button onClick={() => updateProfile(users.id)}>Update Profile</button>
      <button onClick={() => navigate('/home')}>Todo</button>
        </div>
      {/* ))} */}
    </div>
  )
}

export default DashBoard;
