import React from 'react'
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'

const MyProfile = () => {
    const [userInfo, setUserInfo] = useState();
    const [uploadPic, setUploadPic] = useState("");
    const [refresh, setRefresh] = useState(0);
    useEffect(
        ()=>{
            const formData1 = new FormData();
            formData1.append("file", uploadPic);
            formData1.append("upload_preset", "bruinbuuz");
            formData1.append("cloud_name", "dxhk2spfw");
            const formData2 = new FormData();
            if (uploadPic) {
                console.log("called")
            
                // image is asset type, upload is delivery type
                fetch('https://api.cloudinary.com/v1_1/dxhk2spfw/image/upload', {
                    method: 'POST',
                    body: formData1
                })
                    .then(res => res.json())
                    .then(res => {
                            
                            fetch("http://"+window.location.host.split(":")[0]+":4000/changeprofileimg", 
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                                },
                                body: JSON.stringify({
                                    picture: res.url,
                                })
                            })
                            .then(
                                res=>{
                                    if (!res.ok) {
                                        throw Error('could not post data.');
                                    }
                                    return res.json();
                                }
                            )
                            .then(
                                // success prompt or not'
                                res=>{
                                    console.log(res)
                                    if (res){
                                        setRefresh(refresh+1);
                                    }
                                }
                               
                            )
                            
                        })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    ,[uploadPic])

    useEffect( () => {
        fetch("http://"+window.location.host.split(":")[0]+":4000/myprofile", {
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
        , [refresh])

    return (
        <div>
            {userInfo && <div className="userinfo" style={{ maxWidth: "1000px", margin: "0px auto" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "18px 0px",
                    borderBottom: "3px solid black"
                }}>
                    <div className='profile-pic'>
                        <img className='my-profile-img'style={{ border: "1px solid lightgrey", 
                        width: "10rem", height: "10rem", borderRadius: "80px", objectFit: "cover", marginBottom:"0.5em"}}
                            src={userInfo.picture} />
                        <label for="upload"><i className='material-icons'
                        style={{marginTop:"0px", marginLeft:"-23px"}}>add_circle_outline</i></label>
                        <input type="file" id="upload"
                        onChange={(e) => {{ setUploadPic(e.target.files[0]) };}} hidden/>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <h4>{userInfo.username}</h4>
                        <div className='myprofile-bar'>
                            <h6><Link to="" className="profile-bar-button">My Posts</Link></h6>
                            <h6><Link to="Followers" className="profile-bar-button">{userInfo.followers.length} Followers</Link></h6>
                            <h6><Link to="Following" className="profile-bar-button">{userInfo.following.length} Following</Link></h6>
                        </div>
                    </div>
                </div>
                <Outlet context={[userInfo, setUserInfo]}/>
            </div>}

        </div>
        
        
    )
}

export default MyProfile
