import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material'
import BlogList from './BlogList';
const Search = () => {
    const [but, setBut] = useState(0);
    const [content, setContent] = useState("");
    const [result, setResult] = useState(null);
    const [searchType, setSearchType] = useState(0);
    const searchTypes = ["title", "author", "tags", "content"]
    useEffect( 

        ()=>{
        if (content){
            let url = "http://localhost:4000/search/" + content + "?searchType=" + searchTypes[searchType];
            encodeURI(url);
            fetch(url, 
                {method: "GET", headers: {
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
            .then (data => {setResult(data)})
            .catch(err => {
                console.log(err.message);
            })
        }
        
    } , [but])
    
    return (
    <div className="search-page">
        <div className='search-bar' style={{display:"flex"}}>

                <button className='search-type' onClick={()=>{setSearchType(searchType==searchTypes.length-1?0:searchType+1)}}>{searchTypes[searchType]}</button>

            
            <input placeholder={'Search by ' + (searchType==2?searchTypes[searchType]+ " (seperate by space)":
                                                                searchTypes[searchType])} 
            onChange={(e)=>{setContent(e.target.value)}}/>

            <button className='search-button' onClick={()=>{setBut(but+1)}}>Apply Filter</button>
        </div>
        
        <div className="search-result">  
            { result && <BlogList blogs={result} /> }
        </div>
        
    </div>
        
    )
}

export default Search