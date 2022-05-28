import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import Create from './components/Create'
import User from './components/User'
import Following from './components/Following'
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IndividualBlog from './components/IndividualBlog'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<IndividualBlog />} />
        <Route path="Profile" element={<Profile />}>
          <Route index element={<User />} />
          <Route path="Followers" />
          <Route path="Following" element={<Following />} />
          

        </Route>
        <Route path="Create" element={<Create />} />

      </Routes>
    </Router>
  );
}

export default App;
