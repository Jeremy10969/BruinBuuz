import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [picture, setPicture] = useState("");  // default, no pic
    const [url, setUrl] = useState("");
    
    const navigate = useNavigate();



    const postDetails = async () => {
        const formData = new FormData();
        formData.append("file", picture);
        formData.append("upload_preset", "bruinbuuz");
        formData.append("cloud_name", "dxhk2spfw");


        if (picture) {

                // image is asset type, upload is delivery type
            await fetch('https://api.cloudinary.com/v1_1/dxhk2spfw/image/upload', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(res => {
                setUrl(res.secure_url);
                console.log('Success:', res);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }
        else {
            setUrl(picture);
            console.log("you clicked without pic")
        }
        
        

        await fetch("http://localhost:4000/Create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                body,
                picture:url
            })
        }).then (res => res.json())
        .then (data => {
            
            if (data.error) {
                
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                        This is an error alert — <strong>check it out!</strong>
                </Alert>
                console.log("Problem...")
                return;
            }
            else {
                console.log("Sucess!!");
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                        Succesfully Created A Buuz Post! — <strong>check it out!</strong>
                </Alert>
                navigate('/');
            }
        }).catch(err => {
            console.log(err)
        })

        
        
    }

    return (
        <div className="post input"
            style={{ paddingLeft: "3rem", paddingTop: "2rem" }}>
            <input 
            type="text" placeholder="Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <input style={{ height: "300px", width: "800px", }}
                type="text" placeholder="Thoughts?" 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" 
                    onChange={(e) => setPicture(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="submit-post"
            onClick = {() => postDetails()}
            >
                Post it!
            </button>
        </div>
    )
}

export default Create