import React from 'react'
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import Create from './components/Create'
import MyBlogs from './components/MyBlogs'
import Following from './components/Following'
import Followers from './components/Followers'
import Search from './components/Search'
import Signin from './components/Signin'
import Signup from './components/Signup'
import UserPage from './components/UserPage'
import UserBlogs from './components/UserBlogs'
import TagPage from './components/TagPage'
import reducer from './components/userReducer'

import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IndividualBlog from './components/IndividualBlog'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="Home" element={<><Navbar /><Home /></>} />
        <Route path="/blogs/:blogid" element={<><Navbar /><IndividualBlog /></>} />
        <Route path="/tags/:tag" element={<><Navbar /><TagPage /></>} />
        <Route path="/users/:username" element={<><Navbar /><UserPage /></>}>
          <Route index element={<UserBlogs/>}/>
          <Route path="Followers" element={<Followers />}/>
          <Route path="Following" element={<Following />} />


        </Route>
        <Route path="myprofile" element={<><Navbar /><MyProfile /></>}>
          <Route index element={<MyBlogs />} />
          <Route path="Followers" element={<Followers />}/>
          <Route path="Following" element={<Following/>} />
          

        </Route>
        <Route path="Create" element={<><Navbar /><Create /></>} />
        <Route path="Search" element={<><Navbar /><Search /></>}  />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
