
import React from 'react'
import { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'
import MuiAlert from './MuiAlert';


const UserPage = () => {
    const {username} = useParams();
    const [userInfo, setUserInfo] = useState(null);
    
    const [btnstate, setbtnstate] = useState(false);
    const [followingState, setFollowingState] = useState(false);
    const [alert, setAlert] = useState(false);

    const getFriendStatus=()=>{
        fetch("http://"+window.location.host.split(":")[0]+":4000/getfollowstatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                userid: userInfo._id
            })
        })
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch the data.');
            }
            return(res.json());
            
        })
        .then(
            result => {
                setFollowingState(result?true:false);
                {console.log(followingState)}
            }
           
        )
    }
    const changeFriendStatus=()=>{
        fetch("http://"+window.location.host.split(":")[0]+":4000/changefollowstatus", {
            method: "POST",
            headers: {             
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                userid: userInfo._id
            })
        }
        )
    
    .then(res => {
        if (!res.ok) {
            throw Error('could not fetch the data.');
        }
        
        
        return res.json();
    })
    .then(res => {
        console.log(res.requeststatus)
        if (res.requeststatus){
            setbtnstate(!btnstate);
        }
        else{
            setAlert(true);
        }
    }

    )
    .catch(err => {
        console.log(err.message);
    })}



    useEffect( () => {
        
        fetch("http://"+window.location.host.split(":")[0]+":4000/users/" + username, {
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
                setUserInfo(data);
            })
            .then(
                res => {userInfo && getFriendStatus()})
        .catch(err => {
            console.log(err.message);
        });

    }
    

        , [btnstate, userInfo==null])

    
    return (
        <div>
            
            {userInfo && <div className="userinfo" style={{ maxWidth: "1000px", margin: "0px auto" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "18px 0px",
                    borderBottom: "3px solid black"
                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px", objectFit: "cover" }}
                            src={userInfo.picture} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <h4>{userInfo.username}</h4> 
                        <div className='profile-bar'>
                            <h6><Link to="" className="profile-bar-button">Posts</Link></h6>
                            <h6><Link to="Followers" className="profile-bar-button">{userInfo.followers.length} Followers</Link></h6>
                            <h6><Link to="Following" className="profile-bar-button">{userInfo.following.length} Following</Link></h6>
                        </div>

                       {followingState?
                    <button className="following-button"  onClick={changeFriendStatus}>Unfollow</button>
                    :
                    <button className="follow-button"  onClick={changeFriendStatus}>Follow</button>
                       }
                                  
                    </div>
                </div>
                {<MuiAlert show={alert} hide={()=>{setAlert(false)}} type="error" message="Cannot follow yourself"/>}
                
                <Outlet context={[userInfo, setUserInfo]}/>

            </div>}

        </div>
        
        
    )
}


export default UserPage
