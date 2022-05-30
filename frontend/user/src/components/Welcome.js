import React from 'react'

const Welcome = () => {
    return (
        <div className = "welcome-page">
            <div className="welcome-left">
                <h3>Welcome to</h3>
                <h1>Bruin Buuz</h1>
                <div className="description">
                    <h4>Where Bruins Explore</h4>
                    <p>An online application that allows users to upload original articles and pictures while having the basic functionalities of a social media.
                        The tags and contents the user generated can create a welcoming space for students with common interests at UCLA.</p>
                </div>
                <div className="selection">
                    <a href="/signin">Sign in</a>
                    <a href="/signup">Sign up</a>
                </div>
            </div>
        </div>
    )
}

export default Welcome