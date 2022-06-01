import React, { useState, useEffect } from 'react'
import BlogList from './BlogList';
//import IndividualBlog from './IndividualBlog';

const Home = ()=>{
    
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    useEffect(() => {

        const tags = localStorage.getItem("user");
        
        
        fetch("http://localhost:4000/feed"
             ,{ headers: {
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
    }, [refresh]) // do it at mounting

    return(
        <div className="home">
            <div className="slogan">
                <h1>
                    "EXPLORE BRUINS!!!!!"
                </h1>
            </div>
            
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { blogs && <BlogList blogs={blogs} refresh={()=>setRefresh(refresh+1)}/> }
            
            { !isPending && !blogs && <div>"You've reached the end! No posts associated." </div> }

        </div>
    )
}

export default Home