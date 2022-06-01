import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material'
import BlogList from './BlogList';
const Search = () => {
    const [but, setBut] = useState(0);
    const [content, setContent] = useState("");
    const [result, setResult] = useState(null);
    const [searchType, setSearchType] = useState(0);
    const searchTypes = ["title", "author", "tags", "content"]
    const [filter, setFilter] = useState(0);
    const filterTypes = ["latest", "earliest"];
    useEffect( 

        ()=>{
        if (content){
            let url = "http://"+window.location.host.split(":")[0]+":4000/search/" + content + "?searchType=" + searchTypes[searchType]
            + " " + filterTypes[filter];
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
            <div>
            <button className='search-type' onClick={()=>{setSearchType(searchType==searchTypes.length-1?0:searchType+1)}}>
                {searchTypes[searchType]}</button>
            <button className='search-type' onClick={()=>{setFilter(filter==1?0:1)}}
            style={{width:"6.1em", height:"1.8em", fontSize:"smaller", marginLeft:"-1.8em"}}>
                {filterTypes[filter]}
                </button>
            </div>
            
            <input placeholder={'Search by ' + (searchType==2?searchTypes[searchType]+ " (seperate by space)":
                                                                searchTypes[searchType])} 
            onChange={(e)=>{setContent(e.target.value)}}/>

            <button className='search-button' onClick={()=>{setBut(but+1)}}>Apply Filter</button>
        </div>

        <div className="search-result">  
        
            { result && result.length==0?<div className='feed'><h5>Oops, seems like nothing is here... Why not Create some?</h5></div>:""}
            { result && <BlogList blogs={result} refresh={()=>{setBut(but+1)}}/> }
        </div>
        
    </div>
        
    )
}

export default Search