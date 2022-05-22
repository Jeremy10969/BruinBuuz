import React from 'react'

const Create = ()=>{
    return(
        <div className="post input"
        style={{paddingLeft:"3rem", paddingTop:"2rem"}}>
            <input type="text" placeholder="Title" />
            <input style={{height:"300px", width:"800px",}}
            type="text" placeholder="Thoughts?" />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="submit-post">
                Post it!
            </button>
        </div>
    )
}

export default Create