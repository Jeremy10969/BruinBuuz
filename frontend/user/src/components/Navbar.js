import React from 'react'

const Navbar = ()=>{
    return(
        <nav>
            <div className="nav-topbar">
                <a href="/" className="logo">
                    Bruin Buuz
                </a>
               
                <ul id="nav-mobile" className="right">
                    <li><a href="/Create">Create</a></li>
                    <li><a href="/Profile">Profile</a></li>
                    <li>
                        <button className="logout" onClick={()=>{
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