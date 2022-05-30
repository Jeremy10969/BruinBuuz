import React from 'react'
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PostEntrance from './PostEntrance';
import PostEntranceList from './PostEntranceList';
const Followers = () => {
    const [userInfo, setUserInfo] = useOutletContext();
    const [followersBlogList, setFollowersBlogList] = useState([]);

    useEffect(() => {
        setFollowersBlogList([]);
        userInfo.followers.map( (followersuser, index) => {
            fetch("http://localhost:4000/bloglist/" + followersuser._id
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
            setFollowersBlogList(followersBlogList => [...followersBlogList, {user: followersuser, blogs: data}])
        })
        .catch(err => {
            console.log(err.message);
        })
        }
            
        )
        
    }, [userInfo])
    return (
        
    <div>
        <h4>Followers</h4>
        {
            
            followersBlogList.map(
                (obj, index)=>{
                    return(
                        <div>

 
                            <h5>
                                <img className="profile-name" src="https://cdn.dribbble.com/users/559871/screenshots/15470728/media/9e081b71dfe6dec27a37e8c9bfc1af35.png?compress=1&resize=400x300" />
                                {
                                    <a className="profile-username" href={"/users/"+obj.user.username}>{obj.user.username}</a>
                                }
                                
                                
                            </h5>
                            <PostEntranceList posts={obj.blogs.slice(0,3)}/>


                        </div>
                    )
                    


                    
                }
            )


            
        }

        
       

       

       
    </div>

    )
}

export default Followers;