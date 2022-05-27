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
      
        <div class="card">
            <h2>BruinBuuz Signin</h2>
            <input type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={()=>PostData()}>Login</button>
            <h5>
                <Link to="/signup">No account yet?</Link>
            </h5>
        </div>
       
    )
}

export default Signin