import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useOutletContext } from "react-router-dom";
import PostEntranceList from './PostEntranceList'
const UserBlogs = () => {
    const [userInfo, setUserInfo] = useOutletContext();
    const [userBlogs, setUserBlogs] = useState([]);


    useEffect(() => {
        
        fetch("http://"+window.location.host.split(":")[0]+":4000/bloglist/"+userInfo._id
             ,{ 
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
             }
            )
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch the data.');
            }
            return res.json();
        })
        .then(
            data => {

            setUserBlogs(data);

        })
        .catch(err => {
            console.log(err.message);
        })
    }, [])
    return (
        <div>
            <h4>Posts</h4>
            {userBlogs&&userBlogs.lengt==0?<h5>No following currently.</h5>:""}   
           { userBlogs &&  <PostEntranceList posts={userBlogs} /> }          
        </div>

    )
}

export default UserBlogs;