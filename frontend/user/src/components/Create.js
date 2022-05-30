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
    const [uploadedFiles, setFiles] = useState([]);
    const [uploadSuccess, setUploadSuccess] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {

        // it must have a url present, so initialization will not render
        if (url) {
            console.log(title, body, url, but, tags);
            setShowMessage(false);
            fetch("http://localhost:4000/Create", {
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

                        console.log("Problem...")
                        return;
                    }
                    else {
                        setUploadSuccess(true);
                        setShowMessage(true);
                        console.log("Sucess!!");

                        navigate('/Home');
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
                            { { setFiles(e.target.files) } };
                            {
                                if (e.target.files.length > 1) { setFname(e.target.files.length + " files") }
                                else { setFname(e.target.files[0].name) }
                            }
                        }}
                        multiple
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"
                        value={fname} />
                </div>
            </div>

            <input
                type="text" placeholder="Add tags (separate by ;)"
                value={tags.join(';')}
                onChange={(e) => setTags(e.target.value.split(";"))}
            />

            <div>
                <button className="submit-post"
                    onClick={postDetails}
                >
                    Post it!
                </button>

                {showMessage ? <MuiAlert type={uploadSuccess ? 'success' : 'error'}
                    content={uploadSuccess ? "Post successfully posted!" : "Must have a title and some content / Post not successfully uploaded."} /> : ''}


            </div>

        </div>
    )
}

export default Create