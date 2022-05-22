import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import Create from './components/Create'
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route exact path = "/" element={<Home />} />
      <Route exact path = "/Profile" element={<Profile />} />
      <Route exact path = "/Create" element={<Create />} />
    </Routes>
    </Router>
  );
}

export default App;
