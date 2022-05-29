import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BlogList from './BlogList';

const TagPage = ()=>{
    const { tag } = useParams();
    
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("tag", tag)
        
        fetch("http://localhost:4000/tags/"+tag,
            { headers: {
                "Content-Type": "application/json",
                 "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
             }
            )
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch the data.');
            }
            
            return res.json();
        })
        .then(data => {
            console.log(data);
            setIsPending(false);
            setBlogs(data);
            setError(null);

        })
        .catch(err => {
            console.log(err.message);
            setIsPending(false);
            setError(err.message);
        })
     }, []) 

    return(
        <div className="home">
            <div className="slogan">
                <h1>
                    "EXPLORE BRUINS!!!!!"
                </h1>
            </div>
            <div className="tag">
                <h2>
                    {tag}
                </h2>
            </div>
            
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { blogs && <BlogList blogs={blogs} /> }
            { !isPending && !blogs && <div>"You've reached the end! No posts associated." </div> }

        </div>
    )
}

export default TagPage