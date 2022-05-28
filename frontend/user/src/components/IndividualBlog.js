import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IndividualBlog = () => {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(id);
        fetch("http://localhost:4000/blogs/" +id)
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch the data.');
            }
            
            return res.json();
        })
        .then(data => {
            console.log(data);
            setIsPending(false);
            setData(data);
            setError(null);

        })
        .catch(err => {
            console.log(err.message);
            setIsPending(false);
            setError(err.message);
        })
    }, [id]) // do it at mounting

    return (
        <div className="individual-blog">
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { data && 
            <article>
                <h2>Blog details - { id }</h2>
                <h2>{data.title}</h2>
                <p>Written by </p>
                <div>{ data.body} </div>
                {data.picture !== '' && data.picture !== 'no pic' &&
                        <div className="feed-image">
                        <img style={{width:"100%", height:"70%", objectFit:"cover"}} 
                        src={data.picture} />
                        </div>
                        }
                <div className="feed-content"  >
                <h6>Tag TB Implemented</h6>
                    <i className="material-icons">favorite_border</i>
                    <input type="text" placeholder="Add your comment" />
                </div>

            </article>
            
             }
            { !isPending && !data && <div>"You've reached the end! No posts associated." </div> }
            
        </div>
    );
}

export default IndividualBlog;