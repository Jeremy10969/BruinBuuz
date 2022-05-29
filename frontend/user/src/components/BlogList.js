import { Link } from "react-router-dom";
import React, { useState } from 'react'

const BlogList = ({ blogs }) => {
    const [data, setData] = useState(null);
    const likeBlog = (id) => {
        fetch("http://localhost:4000/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                blogId: id
            })
        }).then(res => res.json())
        .then(result => {
            //console.log(result)
            const newData = data.map(blog => {
                if(blog._id == result._id){
                    return result
                } else {
                    return blog
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }
    const unlikeBlog = (id) => {
        fetch("http://localhost:4000/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                blogId: id
            })
        }).then(res => res.json())
        .then(result => {
            //console.log(result)
            const newData = data.map(blog => {
                if(blog._id == result._id){
                    return result
                } else {
                    return blog
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }
    const commentBlog = (text, blogId) => {
        fetch("http://localhost:4000/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                blogId,
                text
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.map(blog => {
                if(blog._id == result._id){
                    return result
                } else {
                    return blog
                }
            })
            setData(newData)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div className="blog-list">
            {blogs.map(blog => (
                <div className="feed"  key={blog._id}>

                    <a href={"/blogs/"+blog._id}>
                    <h5>{ blog.title }</h5>
                    </a>
                    <p>Posted by <a href={"/users/"+blog.author.username}>{blog.author.username}</a></p>
                        {blog.picture !== '' && blog.picture !== 'no pic' &&
                        <div className="feed-image">
                        <img style={{width:"100%", height:"70%", objectFit:"cover"}} 
                        src={blog.picture} />
                        </div>
                        }
                <div className="feed-content"  >
                    <i className="material-icons">favorite_border</i>
                    <i className="material-icons"
                        onClick = {() => {likeBlog(blog._id)}}
                        >thumb_up</i>
                    <i className="material-icons"
                         onClick = {() => {unlikeBlog(blog._id)}}
                        >thumb_down</i>
                    <h6>{blog.likes.length} likes</h6>
                    <h6>Tag TB Implemented</h6>
                    <p>{ blog.body?.length > 20 ? blog.body.substr(0, 20)+'...' : blog.body  }</p>
                    {
                        blog.comments.map(info => {
                            return(
                                <h6 key = {info._id}>
                                    <span style = {{fontWeight: "1000"}}>
                                        {info.author}
                                    </span> {info.text}
                                </h6>
                            )
                        })
                    }
                    <form onSubmit = {(e) => {
                        e.preventDefault()
                        commentBlog(e.target[0].value, blog._id)
                    }}>
                        <input type="text" placeholder="Add your comment" />
                    </form>
                    
                </div>
                </div>
            ))}

        </div>
    );

}

export default BlogList;