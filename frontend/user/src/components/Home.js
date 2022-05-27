import React, { useState, useEffect } from 'react'
import BlogList from './BlogList';
//import useFetch from "./useFetch";

const Home = ()=>{
    //const { data:blogs, isPending, error } = useFetch("http://localhost:4000/all-blog");
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        fetch("http://localhost:4000/all-blog"
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
    }, []) // do it at mounting

    return(
        <div className="home">
            <div className="slogan">
                <h1>
                    "EXPLORE BRUINS!!!!!"
                </h1>
            </div>
            
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { blogs && <BlogList blogs={blogs} /> }
            { !isPending && !blogs && <div>"You've reached the end! No posts associated." </div> }

            <div className="feed">
                <h5>A Smol Bruin</h5>
                <div className="feed-image">
                    <img style={{width:"100%", height:"70%", objectFit:"cover"}} 
                    src="https://static8.depositphotos.com/1377527/943/i/600/depositphotos_9431737-stock-photo-portrait-of-gray-striped-cat.jpg" />
                </div>
                <div className="feed-content">
                    <i className="material-icons">favorite_border</i>
                    <h6>My Cutie</h6>
                    <p>Check out my new family member!</p>
                    <input type="text" placeholder="Add your comment" />
                </div>
            </div>

            <div className="feed">
                <h5>A Smol Bruin</h5>
                <div className="feed-image">
                    <img style={{width:"100%", height:"70%", objectFit:"cover"}} 
                    src="https://navsci.ucla.edu/wp-content/uploads/2020/04/bruin-bound.jpg" />
                </div>
                <div className="feed-content">
                    <i className="material-icons">favorite_border</i>
                    <h6>#UCLAbound</h6>
                    <p>I am officially one of the class of 2024!!!</p>
                    <input type="text" placeholder="Add your comment" />
                </div>
            </div>

            <div className="feed">
                <h5>A Smol Bruin</h5>
                <div className="feed-image">
                    <img style={{width:"100%", height:"70%", objectFit:"cover"}} 
                    src="https://cdn.dribbble.com/users/559871/screenshots/15470728/media/9e081b71dfe6dec27a37e8c9bfc1af35.png?compress=1&resize=400x300" />
                </div>
                <div className="feed-content">
                    <i className="material-icons">favorite_border</i>
                    <h6>Hello World</h6>
                    <p>I'm new to Bruin Buuz. Check out my new profile picture!</p>
                    <input type="text" placeholder="Add your comment" />
                </div>
            </div>
        </div>
    )
}

export default Home