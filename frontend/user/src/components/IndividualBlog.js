import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IndividualBlog = () => {
    const { blogid } = useParams();

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(blogid);
        fetch("http://localhost:4000/blogs/" +blogid, { 
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

    return (
        <div className="individual-blog">
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { data && 
            <article>
                <div>
                {data.tags.map(tag => 
                <div className="tag"  key={tag}> 
                 <a href={"/tags/"+tag}><h6> {tag}</h6></a>
                </div>
                )}
                        </div>
                
                <div className="gap"> </div>
                <div className="blog-content">
                    <h3>{data.title}</h3>
                    <p>Written by <a href={"/users/"+data.author.username}>{data.author.username}</a></p>
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