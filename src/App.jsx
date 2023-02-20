// import './App.css';
import { useState } from 'react';
import { app, database } from './firebaseConfig'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './user/Register';
import Login from './user/Login';
import Home from './user/Home';
import DashBoard from './user/Dashboard';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ViewTodo from './admin/ViewTodo';
import ForgetPassword from './ForgetPassword';
import { Toaster } from 'react-hot-toast';
import UpdateProfile from './user/UpdateProfile';
import UserProfile from './user/UserProfile';
function App() {


  return (
    <><div>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      ></Toaster>
    </div>


      <BrowserRouter>
        <Routes>
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/' element={<Navigate to='/login' />} />
          <Route exact path='/dashboard' element={<DashBoard />} />
          <Route exact path='/admin-login' element={<AdminLogin />} />
          <Route exact path='/forget-password' element={<ForgetPassword />} />
          <Route exact path='/admin-dashboard' element={<AdminDashboard />} />
          <Route exact path='/view-todo' element={<ViewTodo />} />
          <Route exact path='/update-profile' element={<UpdateProfile />} />
          <Route exact path='/user-profile' element={<UserProfile />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>

      </BrowserRouter>
    </>

  );
}

export default App;
