import React from 'react'
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PostEntrance from './PostEntrance';
import PostEntranceList from './PostEntranceList';
const Following = () => {
    const [userInfo, setUserInfo] = useOutletContext();
    const [followingBlogList, setFollowingBlogList] = useState([]);

    useEffect(() => {
        console.log(userInfo.following);
        userInfo.following.map( (followinguser, index) => {
            fetch("http://localhost:4000/bloglist/" + followinguser._id
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
            setFollowingBlogList(followingBlogList => [...followingBlogList, {user: followinguser, blogs: data}])
        })
        .catch(err => {
            console.log(err.message);
        })
        }
            
        )
        
    }, [])
    return (
        
    <div>
        <h4>Following</h4>
        {
            
            followingBlogList.map(
                (obj, index)=>{
                    return(
                        <div>
                            
                            <h5>
                                <img className="profile-name" src={obj.user.picture} />
                                {<a className="profile-username" href={"/users/"+obj.user.username}>{obj.user.username}</a>}
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

export default Following;