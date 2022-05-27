import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import BlogList from './BlogList'

const User = () => {
    const [myPosts, setMyPosts] = useState([]);


    useEffect(() => {
        
        fetch("http://localhost:4000/my-posts"
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

            setMyPosts(data);

        })
        .catch(err => {
            console.log(err.message);
        })
    }, [])
    return (
        
       

        <div>
            <h4>My Posts</h4>
            <div className="gallery" style={{}}>
               
            { myPosts &&  <BlogList blogs={myPosts} /> }
           
            </div>
        </div>

    )
}

export default User;