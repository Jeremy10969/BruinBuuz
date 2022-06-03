import React from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostEntranceList from './PostEntranceList';
import { useLocation } from "react-router-dom";
const Followers = () => {
    const usrnameStr = localStorage.getItem("user");
    const [userInfo, setUserInfo] = useOutletContext();
    const navigate = useNavigate();
    const [followersBlogList, setFollowersBlogList] = useState([]);
    const [removeFollower, setRemoveFollower] = useState(null);
    const location = useLocation();
    useEffect(() => {
        if (removeFollower){
            fetch("http://"+window.location.host.split(":")[0]+":4000/removefollower/" + removeFollower,
            {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                    }
            })
            .then(
                res => {res.json();
                    window.location.reload(false);
                }
            )
        }
        
    }, [removeFollower])
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
                        <div className='follower-list'>
                            <h5>
                                <img className="profile-name" src={obj.user.picture} />
                                {
                                    <a className="profile-username" href={"/users/"+obj.user.username}>{obj.user.username}</a>
                                }
                                {location.pathname.substring(0,5)=='/user'?"":<label for="remove-follower"><i className='material-icons'>remove_circle_outline</i></label>}
                            
                                <button id="remove-follower" onClick={()=>{setRemoveFollower(obj.user._id)}} hidden/>                           
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