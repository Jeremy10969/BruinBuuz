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
        </div>
       
    )
}

export default Signup