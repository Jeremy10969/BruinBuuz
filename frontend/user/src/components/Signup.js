import React, {useEffect, useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Alert, Snackbar } from '@mui/material';
import MuiAlert from './MuiAlert';

const Signup =() => {
    const navigate = useNavigate();
    const [fullName,setFullName] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [alert, setAlert] = useState("")
    const [open, setOpen] = useState(false);
    const PostData = 
        ()=>{
    
            if (!fullName || !email || !username || !password)
            {setOpen(true);
            setAlert("You need to complete all the fields")}
            else
            {
            console.log("posting data");
            fetch("http://localhost:4000/signup",{
                method:"post",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    fullName,
                    username,
                    email,
                    password
                })
            }).then(res=>res.json()).then(data => {
                if (data.error)
                {setOpen(true);
                setAlert(data.error)}
                else
                {console.log(data);
                    navigate('/signin');}})
        }}
    

    return (      
        <div class="authpage">
            <h1>Bruin Buuz</h1>
            <div className="box">
                <legend>Sign Up</legend>
                <input type="text"
                placeholder="First and last name"
                value={fullName}
                onChange={(e)=>setFullName(e.target.value)}/>
                <input type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}/>
                <input type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
                <button className="signinup" onClick={()=>PostData()}>Sign Up</button>
                <h5><span>or</span></h5>
                <h6>
                    <Link to="/signin">Already have an account?<br/>Sign in here!</Link>
                </h6>
            </div>
            <MuiAlert show={open} hide={() => {setOpen(false)}} message={alert} type="error"/>
             
           
             
        </div>
       
    )
}

export default Signup