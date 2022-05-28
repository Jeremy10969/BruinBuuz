import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Signin =() => {
    const navigate = useNavigate();
    
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const PostData = ()=>{
        console.log("posting data");
        fetch("http://localhost:4000/signin",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json()).then(data => {
            if (data.error)
            {console.log("sign in error")}//need to be change to alert
            else
            {
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",JSON.stringify(data.user))
                console.log(data);
                navigate('/');}})}

    return (
      
        <div class="authpage">
            <h1>Bruin Buuz</h1>
            <div className="box">
                <legend>Sign In</legend>
                <input type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
                <button className="signinup" onClick={()=>PostData()}>Sign In</button>
                <h5><span>or</span></h5>
                <h6>
                    <Link to="/signup">No account yet?<br/>Sign up here!</Link>
                </h6>
            </div>
        </div>
       
    )
}

export default Signin