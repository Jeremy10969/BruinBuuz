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
            fetch("http://"+window.location.host.split(":")[0]+":4000/bloglist/" + followersuser._id
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
            followersBlogList.length!=0?
            followersBlogList.map(
                (obj, index)=>{
                    return(
                        <div>
                            <h5>
                                <img className="profile-name" src={obj.user.picture} />
                                {
                                    <a className="profile-username" href={"/users/"+obj.user.username}>{obj.user.username}</a>
                                }                              
                            </h5>
                            <PostEntranceList posts={obj.blogs.slice(0,3)}/>
                        </div>
                    )                   
                }
            )    
            :
            <h5>No followers currently.</h5>     
        }

        
       

       

       
    </div>

    )
}

export default Followers;