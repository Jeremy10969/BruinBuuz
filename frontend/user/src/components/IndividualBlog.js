import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const moment = require('moment');

const usrnameStr = localStorage.getItem("user");
const usrname = JSON.parse(usrnameStr);

const IndividualBlog = () => {
    const { blogid } = useParams();

    const [data, setData] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

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

    const deleteBlog = (blogid) => {
        fetch(`http://"+window.location.host.split(":")[0]+":4000/deleteBlog/${blogid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = result.data.filter(data => {
                return data._id !== result._id
            })
            setData(newData)
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
                    <p>Written by <a href={"/users/"+data.author.username}>{data.author.username}</a></p>
                    <p><font size="3">{moment(data.date).format("YYYY-MM-DD HH:mm")}</font></p>
                    
                    {data.picture !== '' && data.picture !== 'no pic' &&
                            <div className="feed-image">
                            <img style={{width:"70%", height:"50%", objectFit:"cover"}} 
                            src={data.picture} />
                            </div>
                            }
                    <div className="blog-text">{data.body} </div>
                </div>
                <div className="interaction">
                    <i className="material-icons">favorite_border</i>
                    <input type="text" placeholder="Add your comment" />
                </div>
                <div className="gap"> </div>

            </article>
            
             }
            { !isPending && !data && <div>"You've reached the end! No posts associated." </div> }
            
        </div>
    );
}

export default IndividualBlog;