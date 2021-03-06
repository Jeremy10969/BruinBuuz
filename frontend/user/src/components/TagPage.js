import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BlogList from './BlogList';

const TagPage = ()=>{
    const { tag } = useParams();
    
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [followingState, setFollowingState] = useState(false);
    const [btnstate, setbtnstate] = useState(false);

    const getFollowStatus=()=>{
        fetch("http://"+window.location.host.split(":")[0]+":4000/tagfollowstatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                tag: tag
            })
        })
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch the data.');
            }
            return(res.json());
            
        })
        .then(
            result => {
    
                setFollowingState(result?true:false);
            }
           
        )
    }

    const followTag = () => {
    
        
        if (!followingState) {
            console.log("Trying to follow the tag.")
            fetch("http://"+window.location.host.split(":")[0]+":4000/followtag/"+tag,
            { 
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    tagname: tag
                })
            }
            ).then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data.');
                }
                // console.log(res)
                setbtnstate(!btnstate);
                return res.json();
            }).then(data => console.log(data))
            .catch(err => {
                console.log(err.message);
            })
        }
        else {
            console.log("Trying to unfollow the tag.")
            fetch("http://"+window.location.host.split(":")[0]+":4000/unfollowtag/"+tag,
            { 
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    tagname: tag
                })
            }
            ).then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data.');
                }
                setbtnstate(!btnstate);
                return res.json();
            }).then(data => console.log(data))
            .catch(err => {
                console.log(err.message);
            })
        }
            
    }

    useEffect(() => {
        // console.log("tag", tag)
        

        fetch("http://"+window.location.host.split(":")[0]+":4000/tags/"+tag,
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
            // console.log(data);
            getFollowStatus();
            setIsPending(false);
            setBlogs(data);
            setError(null);

        })
        .catch(err => {
            console.log(err.message);
            setIsPending(false);
            setError(err.message);
        })
     }, [tag, btnstate]) 

    return(
        <div className="home">
            <div className="tag-page">
                <h4>
                    Posts under the #{tag} tag:
                </h4>

                {followingState?
                <button className='tag-unfollow' onClick={followTag}>"Unfollow this tag!"</button>
                :
                <button className='tag-follow' onClick={followTag}>"Follow this tag!"</button>
                }
            </div>
            
            <div style={{paddingTop:"5.5rem"}}>
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { blogs && <BlogList blogs={blogs} refresh={()=>{setbtnstate(btnstate+1)}}/> }
            { !isPending && blogs && blogs.length===0 && <h5>"You've reached the end! No posts associated." </h5> }
            </div>
        </div>
    )
}

export default TagPage