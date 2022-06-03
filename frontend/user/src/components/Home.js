import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import BlogList from './BlogList';
//import IndividualBlog from './IndividualBlog';

const Home = ()=>{
    
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [myinfo, setMyinfo] = useState(null);
    useEffect(() => {

        fetch("http://"+window.location.host.split(":")[0]+":4000/userinfo/myself",
        {
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                 "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(info => {setMyinfo(info)})
        .catch(err => {
            console.log(err.message);
            setError(err.message);
        })
        
        fetch("http://"+window.location.host.split(":")[0]+":4000/feed"
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
            // console.log(data);
            setIsPending(false);
            setBlogs(data);
            setError(null);

        })
        .catch(err => {
            console.log(err.message);
            setIsPending(false);
            setError(err.message);
        })
    }, [refresh])

    return(
        <div className="home">
            <div className="slogan">
                <h1>
                    "EXPLORE BRUINS!!!!!"
                    <div className='if-empty'>
                    {blogs && blogs.length===0?<h2>Posts with the tags you are following will show here.
                You are not following any tags right now... Go Explore some!</h2>:""}
                    </div>
                </h1>

            </div>
            <div className="home-tag-gap">
                {myinfo && myinfo.tags.map(tag => <div className="tags" key={tag}>
                    <Link to={`/tags/${tag}`}>#{tag}</Link>
                </div>
                )}
            </div>


            
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { blogs && <BlogList blogs={blogs} refresh={()=>setRefresh(refresh+1)}/> }
            
            { !isPending && !blogs && <div>"You've reached the end! No posts associated." </div> }

        </div>
    )
}

export default Home