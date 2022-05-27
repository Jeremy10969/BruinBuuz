import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Signup =() => {
    const navigate = useNavigate();
    const [fullName,setFullName] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

const PostData = ()=>{
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
        {console.log("sign up error")}//need to be change to alert
        else
        {console.log(data);
            navigate('/signin');}})
}

    return (
      
        <div class="card">
            <h2>BruinBuuz Signup</h2>
            <input type="text"
            placeholder="First and last name"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}/>
            <input type="text"
            placeholder="User name"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={()=>PostData()}>Signup</button>
            <h5>
                <Link to="/signin">Already have account?</Link>
            </h5>
        </div>
       
    )
}

export default Signup