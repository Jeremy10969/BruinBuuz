import React from 'react'

const Profile = ()=>{
    return(
        <div className="userinfo" style={{maxWidth:"1000px", margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"3px solid black"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px", objectFit:"cover"}}
                    src="https://cdn.dribbble.com/users/559871/screenshots/15470728/media/9e081b71dfe6dec27a37e8c9bfc1af35.png?compress=1&resize=400x300"/>
                </div>
                <div style={{textAlign:"center"}}>
                    <h4>A Smol Bruin</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"110%"}}>
                        <h6>3 Posts</h6>
                        <h6>0 Followers</h6>
                        <h6>0 Following</h6>
                    </div>
                </div>
            </div>
            <div classsName="gallery" style={{}}>
                <img className="post" src="https://static8.depositphotos.com/1377527/943/i/600/depositphotos_9431737-stock-photo-portrait-of-gray-striped-cat.jpg"/>
                <img className="post" src="https://navsci.ucla.edu/wp-content/uploads/2020/04/bruin-bound.jpg"/>
                <img className="post" src="https://cdn.dribbble.com/users/559871/screenshots/15470728/media/9e081b71dfe6dec27a37e8c9bfc1af35.png?compress=1&resize=400x300"/>
            </div>
        </div>
    )
}

export default Profile