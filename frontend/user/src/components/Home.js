import React from 'react'

const Home = ()=>{
    return(
        <div className="home">
            <div className="feed">
                <h5>A Smol Bruin</h5>
                <div className="feed-image">
                    <img style={{width:"100%", height:"70%", objectFit:"cover"}} 
                    src="https://static8.depositphotos.com/1377527/943/i/600/depositphotos_9431737-stock-photo-portrait-of-gray-striped-cat.jpg" />
                </div>
                <div className="feed-content">
                    <i className="material-icons">favorite_border</i>
                    <h6>My Cutie</h6>
                    <p>Check out my new family member!</p>
                    <input type="text" placeholder="Add your comment" />
                </div>
            </div>

            <div className="feed">
                <h5>A Smol Bruin</h5>
                <div className="feed-image">
                    <img style={{width:"100%", height:"70%", objectFit:"cover"}} 
                    src="https://navsci.ucla.edu/wp-content/uploads/2020/04/bruin-bound.jpg" />
                </div>
                <div className="feed-content">
                    <i className="material-icons">favorite_border</i>
                    <h6>#UCLAbound</h6>
                    <p>I am officially one of the className of 2024!!!</p>
                    <input type="text" placeholder="Add your comment" />
                </div>
            </div>

            <div className="feed">
                <h5>A Smol Bruin</h5>
                <div className="feed-image">
                    <img style={{width:"100%", height:"70%", objectFit:"cover"}} 
                    src="https://cdn.dribbble.com/users/559871/screenshots/15470728/media/9e081b71dfe6dec27a37e8c9bfc1af35.png?compress=1&resize=400x300" />
                </div>
                <div className="feed-content">
                    <i className="material-icons">favorite_border</i>
                    <h6>Hello World</h6>
                    <p>I'm new to Bruin Buuz. Check out my new profile picture!</p>
                    <input type="text" placeholder="Add your comment" />
                </div>
            </div>
        </div>
    )
}

export default Home