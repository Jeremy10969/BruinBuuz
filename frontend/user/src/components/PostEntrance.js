
const PostEntrance = (post) => {

    return (

        <div>
            {post.picture == "no pic" ?
                <div className="grid-background-color">
                    <a href={"http://"+window.location.host.split(":")[0] + ":3000/blogs/" + post._id}>
                        <div key={post._id} className="gallery-post-grid">

                            <h5>{post.title?.length > 30 ? post.title.substr(0, 30)+'...' : post.title}</h5>
                            <div>
                                <h6>{post.tags.map((tag)=>("#"+tag+" "))}</h6>
                                <p>{ post.body?.length > 100 ? post.body.substr(0, 100)+'...' : post.body  }</p>

                            </div>
                        </div>
                    </a>
                </div>
                :
                <a href={"http://"+window.location.host.split(":")[0] + ":3000/blogs/" + post._id} >
                    <div className="gallery-post-grid">
                        <div className="cover-image">
                            <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={post.picture} />
                        </div>
                        <div className="hidden-elements" key={post._id}>

                        <h5>{post.title?.length > 30 ? post.title.substr(0, 30)+'...' : post.title}</h5>
                            <div>

                                <h6>{post.tags.map((tag)=>(tag+" "))}</h6>
                                <p>{ post.body?.length > 100 ? post.body.substr(0, 100)+'...' : post.body  }</p>
                            </div>

                        </div>
                    </div>

                </a>}


        </div>)

}

export default PostEntrance;