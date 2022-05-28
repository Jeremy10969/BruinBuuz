import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'

const UserPage = () => {
    const {username} = useParams();
    const [userInfo, setUserInfo] = useState(null);

    useEffect( () => {
        
        fetch("http://localhost:4000/users/" + username, {
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
                console.log(data);
                setUserInfo(data);
            })
        .catch(err => {
            console.log(err.message);
        })}
        , [])

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
                            src="https://cdn.dribbble.com/users/559871/screenshots/15470728/media/9e081b71dfe6dec27a37e8c9bfc1af35.png?compress=1&resize=400x300" />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <h4>{userInfo[0].username}</h4> 
                        <div className='profile-bar'>
                            <h6><Link to="" className="profile-bar-button">. Posts</Link></h6>
                            <h6><Link to="Followers" className="profile-bar-button">{userInfo[0].followers.length} Followers</Link></h6>
                            <h6><Link to="Following" className="profile-bar-button">{userInfo[0].following.length} Following</Link></h6>
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>}

        </div>
        
        
    )
}


export default UserPage
