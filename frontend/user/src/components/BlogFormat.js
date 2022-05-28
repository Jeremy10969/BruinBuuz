const Blog = ({blog}) => {
    return (
        <div className="feed"  link={blog._id}>
        <h5>{ blog.title }</h5>
        <p>Written by ...</p>
            {blog.picture !== '' && blog.picture !== 'no pic' &&
            <div className="feed-image">
            <img style={{width:"100%", height:"70%", objectFit:"cover"}} 
            src={blog.picture} />
            </div>
            }
    <div className="feed-content"  >
        <i className="material-icons">favorite_border</i>
        <h6>Tag TB Implemented</h6>
        <p>{ blog.body }</p>
        <input type="text" placeholder="Add your comment" />
    </div>
    </div>
    )
    
}
    


export default Blog