import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material'
import BlogList from './BlogList';
const Search = () => {
    const [but, setBut] = useState(0);
    const [content, setContent] = useState("");
    const [result, setResult] = useState(null);
    const [searchType, setSearchType] = useState("title");
    useEffect( 

        ()=>{
        if (content){
            console.log("initiate search: " + content);
            setSearchType("title");
            console.log(searchType + "abc");
            let url = "http://localhost:4000/search/" + content + "?searchType=" + searchType;
            encodeURI(url);
            fetch(url, {method: "GET"})
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data.');
                }
                return res.json();
            }).then (data => {setResult(data)}).catch(err => {
                console.log(err.message);
            })
        }
        
    } , [but])
    
    return (
    <div>
        <div className='search-bar'>
            
            <button onClick={()=>{setBut(but+1)}}></button>
            <input placeholder='Search?' onChange={(e)=>{setContent(e.target.value)}}/>
        </div>
        <div >  
            { result && <BlogList blogs={result} /> }
        </div>
        
    </div>
        
    )
}

export default Search