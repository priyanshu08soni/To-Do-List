import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import TaskForm from './pages/TaskForm';

function App() {
  return (
    // make react fragments
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* By help of outlet we will using multiple routes in layout. */}
          <Route index element={<Home/>} />
          <Route path='my-profile' element={<Profile/>} />
          <Route path='login' element={<Login/>} />
          <Route path='signup' element={<SignUp/>} />
          <Route path='task' element={<TaskForm/>} />
          <Route path='task/:id' element={<TaskForm/>} />
          <Route path='profile' element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};
export default App;