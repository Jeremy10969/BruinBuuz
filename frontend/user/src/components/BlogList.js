import { Link } from "react-router-dom";
import React from 'react';
import { useState } from "react";
const moment = require('moment');

const BlogList = ({ blogs, refresh }) => {
    const [allblogs,setAllblogs] = useState(blogs)
    const usrnameStr = localStorage.getItem("user");
    const usrname = JSON.parse(usrnameStr);
    const likeBlog = (id) => {
        fetch("http://"+window.location.host.split(":")[0]+":4000/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                blogId: id
            })
        })
        .then(res => res.json())
        .then(result => {
            refresh();
        })
        .catch(err => {
            console.log(err)
        })
    }
    const unlikeBlog = (id) => {
        fetch("http://"+window.location.host.split(":")[0]+":4000/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                blogId: id
            })
        })
        .then(res => res.json())
        .then(result => {
            refresh();
        })
        .catch(err => {
            console.log(err)
        })
    }
    const commentBlog = (text, blogId) => {
        fetch("http://"+window.location.host.split(":")[0]+":4000/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                blogId,
                text
            })
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            refresh();
        })
        .catch(error => {
            console.log(error)
        })
    }
    const uncommentBlog = (text, blogId) => {
        fetch("http://"+window.location.host.split(":")[0]+":4000/uncomment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                blogId,
                text
            })
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            refresh();
        })
        .catch(error => {
            console.log(error)
        })
    }
    const deleteBlog = (blogid) => {
        fetch(`http://`+window.location.host.split(":")[0]+`:4000/deleteBlog/${blogid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            refresh();
        })
    }

    
    return (
        
        <div className="blog-list">
            {blogs.map(blog => (
                <div className="feed"  key={blog._id}>
                    <div className="title-trash" style={{
                        display:"flex",
                        justifyContent:"space-between"}}>
                    <a href={"/blogs/"+blog._id}>
                    <h5>{ blog.title }</h5>
                    </a>
                    {blog.author._id === usrname._id 
                    && <i className="material-icons" title="Delete this blog permanently"
                        onClick = {() => deleteBlog(blog._id)}
                        >delete</i>
                    }
                    </div>
                    
                    <p>Posted by <img className="profile-name" src={blog.author.picture} alt=""/> 
                    <a href={"/users/"+blog.author.username}>{blog.author.username}</a>
                    <span style = {{float: "right", display:"inline-block"}}>
                    <p>{moment(blog.date).format("YYYY-MM-DD HH:mm")}</p>
                        </span>
                    </p>
                    
                        {blog.picture !== '' && blog.picture !== 'no pic' &&
                        <div className="feed-image">
                        <img style={{width:"100%", height:"70%", objectFit:"cover"}} alt=""
                        src={blog.picture} />
                        </div>
                        }
                   
                <div className="feed-content"  >
                   
                    
                    <p style={{fontSize:"20px", textAlign:"justify"}}>{ blog.body?.length > 200 ? blog.body.substr(0, 200)+'...' : blog.body  }</p>
                    
                        {blog.tags!=="no tag"&&blog.tags.map(tag => <div className="tags" key={tag}>
                        <Link to={`/tags/${tag}`}>#{tag}</Link>
                        </div>
                        )}
                      
                    
                        <div className="bloglist-interaction">
                            <div className="thumbsup" style={{display:"flex"}}>
                        {blog.likes&&blog.likes.includes(usrname._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikeBlog(blog._id)}}
                                    style={{color:"red"}}
                              >favorite</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likeBlog(blog._id)}}
                            >favorite_border</i>
                            }
                            <h6>{blog.likes&&blog.likes.length} likes</h6>
                            </div>

                    {
                        blog.comments&&blog.comments.map(info => {
                            return(
                                <h6 key = {info._id}>
                                    <span style = {{fontWeight: "1000"}}>
                                    <a href={"/users/"+info.author.username}>{info.author.username}</a>
                                    </span> {info.text}
                                    {info.author._id === usrname._id
                                    ?
                                    <i className="material-icons"
                                    style = {{
                                        float: "right"
                                        }}
                                    onClick={()=>{uncommentBlog(info.text, blog._id)}}
                                    >delete</i>
                                    :
                                    null
                                    }
                                </h6>
                            )
                        })
                    }
                    <form onSubmit = {(e) => {
                        e.preventDefault()
                        commentBlog(e.target[0].value, blog._id)
                        e.target.reset()
                    }}>
                        <input type="text" placeholder="Add your comment (hit Enter to publish)" />
                    </form>
                    </div>
                </div>
                </div>
            ))}

        </div>
    );

}

export default BlogList;