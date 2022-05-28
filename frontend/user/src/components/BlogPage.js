import Blog from "./BlogFormat";
import BlogList from "./BlogList";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
const BlogPage = ()=>{
    const [blog, setBlog] = useState(null);
    const {blogid} = useParams();
    //var [blog, setBlog] = useState(null);

    useEffect(() => {
        
        fetch("http://localhost:4000/blog/" + blogid
             ,{ method: "GET",
                 headers: {
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
           setBlog(data);
            {console.log(blog)}
            }           
        )
        .catch(err => {
            console.log(err.message);
        })
    }, [])

    return(
        
        <div>

             <Blog blog={blog} /> 
        </div>
    )
}

export default BlogPage