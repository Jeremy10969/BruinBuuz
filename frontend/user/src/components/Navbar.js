import React from 'react'
import Icon from '@mui/material/Icon';
const Navbar = ()=>{
    return(
        <nav>
            <div className="nav-topbar">
                <a href="/Home" className="logo">
                    Bruin Buuz
                </a>
               
                <ul className="right">
                    <li>
                        <a href="/Search">
                            <Icon className="material-icons" fontSize='1rem' >search</Icon>
                        </a>
                    </li> 
                    <li><a href="/Explore">Explore</a></li>
                    <li><a href="/Create">Create</a></li>
                    <li><a href="/myprofile">Profile</a></li>
                    <li>
                        <button className="logout" onClick={()=>{
                            window.location.href="/"
                            localStorage.clear()
                            dispatchEvent({type:"CLEAR"})
                        }}>
                            Log Out
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar