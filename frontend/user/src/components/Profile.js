import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'

const Profile = () => {
    return (
        <div className="userinfo" style={{ maxWidth: "1000px", margin: "0px auto" }}>
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
                    <h4>A Smol Bruin</h4>
                    <div className='profile-bar'>
                        <h6><a href="/Profile" className="profile-bar-button">3 Posts</a></h6>
                        <h6><a href="/Profile/Followers" className="profile-bar-button">0 Followers</a></h6>
                        <h6><a href="/Profile/Following" className="profile-bar-button">2 Following</a></h6>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Profile
