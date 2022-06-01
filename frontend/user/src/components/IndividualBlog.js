import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const moment = require('moment');

const IndividualBlog = () => {
    const { blogid } = useParams();
    const [data, setData] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const usrnameStr = localStorage.getItem("user");
    const usrname = JSON.parse(usrnameStr);


    useEffect(() => {
        console.log(blogid);
        fetch("http://"+window.location.host.split(":")[0]+":4000/blogs/" +blogid, { 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
            }}
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
                setIsPending(false);
                setData(data);
                setError(null); })
        .catch(err => {
            console.log(err.message);
            setIsPending(false);
            setError(err.message);
        })
    }, [blogid])

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
        }).then(res => res.json())
        .then(result => {
            console.log(result)
        }).catch(err => {
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
        }).then(res => res.json())
        .then(result => {
            console.log(result)
        }).catch(err => {
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
        }).then(res => res.json())
        .then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
    }
    const deleteBlog = (blogid) => {
        fetch(`http://"+window.location.host.split(":")[0]+":4000/deleteBlog/${blogid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
        })
    }

    return (
        <div className="individual-blog">
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { data && 
            <article>
                <div className="tag-gap">
                    {data.tags.map(tag => 
                    <div className="tags-individual-page"  key={tag}> 
                    <a href={`/tags/${tag}`}>#{tag}</a>
                    </div>
                    )}
                    {data.author._id == usrname._id 
                    && <i className="material-icons" title="Delete this blog permanently"
                    style = {{
                        float: "right"
                        }}
                        onClick = {() => deleteBlog(data._id)}
                        >delete</i>
                    }
                </div>
                <div className="gap"> </div>
                <div className="blog-content">
                    <h3>{data.title}</h3>
                    <p>Written by <a href={"/users/"+data.author.username}>{data.author.username}</a ></p >
                    <p><font size="3">{moment(data.date).format("YYYY-MM-DD HH:mm")}</font></p >
                    
                    {data.picture !== '' && data.picture !== 'no pic' &&
                            <div className="feed-image">
                            < img style={{width:"70%", height:"50%", objectFit:"cover"}} 
                            src={data.picture} />
                            </div>
                            }
                    <div className="blog-text">{data.body} </div>
                </div>
                <div className="comment-section">
                {
                        data.comments&&data.comments.map(info => {
                            return(
                                <h5 key = {info._id}>
                                    <span style = {{fontWeight: "1000"}}>
                                        {info.author.username}
                                    </span> {info.text}
                                </h5>
                            )
                        })
                    }
                    </div>
                <div className="interaction">
                <div className="thumbsup" style={{display:"flex"}}>
                        {data.likes&&data.likes.includes(usrname._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikeBlog(data._id)}}
                                    style={{color:"red"}}
                              >favorite</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likeBlog(data._id)}}
                            >favorite_border</i>
                            }
                            <h5>{data.likes&&data.likes.length} likes</h5>
                            </div>
                    <form onSubmit = {(e) => {
                        e.preventDefault()
                        commentBlog(e.target[0].value, data._id)
                        e.target.reset()
                    }}>
                        <input type="text" className="individual-comment" placeholder="Add your comment (hit Enter to publish)" />
                    </form>
                </div>
                <div className="gap"> </div>

            </article>
            
             }
            { !isPending && !data && <div>"You've reached the end! No posts associated." </div> }
            
        </div>
    );
}

export default IndividualBlog;