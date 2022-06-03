import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MuiAlert from './MuiAlert';
import { Alert, Snackbar } from '@mui/material';

const Create = () => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [body, setBody] = useState("");
    const [picture, setPicture] = useState("");  // default, no pic
    const [url, setUrl] = useState("");
    const [but, setBut] = useState(0);
    const [fname, setFname] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    useEffect(() => {

        // it must have a url present, so initialization will not render
        if (url) {
            console.log(title, body, url, but, tags);
            fetch("http://"+window.location.host.split(":")[0]+":4000/Create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    picture: url,
                    tags
                })
            }).then(res => res.json())
                .then(data => {

                    if (data.error) {
                        setUploadSuccess(false);
                        setShowMessage(true);
                        setMessage(data.error);

                        console.log("Problem...")
                        return;
                    }
                    else {
                        tags.map(
                            (tag)=>{
                                fetch("http://"+window.location.host.split(":")[0]+":4000/followtag/"+tag,
                                { 
                                    method: "PUT",
                                    headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                                    },
                                    body: JSON.stringify({
                                        tagname: tag
                                    })
                                })
                                .then(setTimeout(() => {
                                    navigate("/Home");
                                  }, 1000))
                            }
                        )
                        setUploadSuccess(true);
                        setShowMessage(true);
                        setMessage("Successfully uploaded");
                        console.log("Sucess!!");

                        
                    }
                }).catch(err => {
                    console.log(err);
                })

        }

    }, [but])



    const postDetails = () => {
        const formData = new FormData();
        formData.append("file", picture);
        formData.append("upload_preset", "bruinbuuz");
        formData.append("cloud_name", "dxhk2spfw");


        if (picture) {

            // image is asset type, upload is delivery type

            fetch('https://api.cloudinary.com/v1_1/dxhk2spfw/image/upload', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(res => {

                    setUrl(res.url);
                    setBut(but + 1);
                })
                .catch(error => {


                    console.error('Error:', error);
                });


        }
        else {

            console.log("You are not uploading pic.");
            setUrl("no pic");
            setBut(but + 1);
        }



    }

    return (
        <div className="post-input">
            <input
                type="text" placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea style={{height: "300px"}}
                type="text" placeholder="Thoughts?"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file"
                        onChange={(e) => {
                            { setPicture(e.target.files[0]) };
                            {
                                if (e.target.files.length > 1) { setFname(e.target.files.length + " files") }
                                else { setFname(e.target.files[0].name) }
                            }
                        }}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"
                        value={fname} />
                </div>
            </div>

            <input
                type="text" placeholder="Add tags (separate by ;) and follow them. At least add one!"
                value={tags.join(';')}
                onChange={(e) => setTags(e.target.value.split(";"))}
            />

            <div>
                <button className="submit-post"
                    onClick={postDetails}
                >
                    Post it!
                </button>

                <MuiAlert show={showMessage} 
                hide={() => {setShowMessage(false)}} 
                message={message}
                type={uploadSuccess ? 'success' : 'error'}
                />

            </div>

        </div>
    )
}

export default Create