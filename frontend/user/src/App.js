import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import Create from './components/Create'
import User from './components/User'
import Following from './components/Following'
import Search from './components/Search'
import Signin from './components/Signin'
import Signup from './components/Signup'
import reducer from './components/userReducer'
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Profile" element={<Profile />}>
          <Route index element={<User />} />
          <Route path="Followers" />
          <Route path="Following" element={<Following />} />


        </Route>
        <Route path="Create" element={<Create />} />
        <Route path="Search" element={<Search/>}  />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
