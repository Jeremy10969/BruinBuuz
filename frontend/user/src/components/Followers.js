import React from 'react'
import { useOutletContext } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PostEntrance from './PostEntrance';
const Followers = () => {
    const [userInfo, setUserInfo] = useOutletContext();
    const followers = userInfo.followers;
    const following = userInfo.following;
    return (
    <div>
        <h4>Followers</h4>

        {followers&& followers.map(
            ()=>(
                <div className="gallery">
                    <PostEntrance></PostEntrance>
                </div>
                
            )
        )}


        <h5>
            <img className="profile-name" src="https://static8.depositphotos.com/1377527/943/i/600/depositphotos_9431737-stock-photo-portrait-of-gray-striped-cat.jpg" />
            bruin1
        </h5>
        <div className="gallery">
            <img src="https://static8.depositphotos.com/1377527/943/i/600/depositphotos_9431737-stock-photo-portrait-of-gray-striped-cat.jpg" />
            <img src="https://navsci.ucla.edu/wp-content/uploads/2020/04/bruin-bound.jpg" />
            <img src="https://cdn.dribbble.com/users/559871/screenshots/15470728/media/9e081b71dfe6dec27a37e8c9bfc1af35.png?compress=1&resize=400x300" />

        </div>

    </div>

    )
}

export default Followers;