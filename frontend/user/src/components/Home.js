import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import BlogList from './BlogList';

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
                    {blogs &&myinfo&& myinfo.tags.length==0?<h2>Hello, {myinfo.fullName}, posts with the tags you are following will show here.
                You are not following any tags right now... Go Explore some!</h2>:""}
                    </div>
                </h1>

            </div>
            


            
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            {myinfo && myinfo.tags.length!=0 && <div className="home-tag-gap" style={{'marginTop':'20px', 'marginLeft':'40px', 'fontFamily':'Montserrat' }}>
                <span style={{'marginRight': "1rem", 'fontSize': '1.2rem'}}>Tags you are following:</span>
                {myinfo && myinfo.tags.map(tag => <div className="tags" key={tag}>
                    <Link to={`/tags/${tag}`}>#{tag}</Link>
                </div>
                )}
            </div>}
            { blogs && <BlogList blogs={blogs} refresh={()=>setRefresh(refresh+1)}/> }
            
            { !isPending && !blogs && <div>"You've reached the end! No posts associated." </div> }

        </div>
    )
}

export default Home