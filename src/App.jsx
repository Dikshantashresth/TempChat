import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider, useUserContext } from './context/userContext'
import Register from './components/Register'
import Login from './components/Login'
import axios from 'axios'
import Chat from './components/Chat'
import Dashboard from './components/Dashboard'
import Create from './components/Create'
import Join from './components/Join'
import Leave from './components/Leave'
import Delete from './components/Delete'

axios.defaults.withCredentials = true;


function App() {
  return (<BrowserRouter>
    <UserProvider>
      
        <Routes>
   
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/dashboard/:id' element={<Dashboard/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/join'  element={<Join/>}/>
          <Route path='/remove/:roomid' element={<Delete/>}/>
          <Route path= '/leave/:roomid' element={<Leave/>}/>
        </Routes>
      
    </UserProvider>
    </BrowserRouter>
  )
}

export default App
