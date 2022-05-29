import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
    return (
        <div className="blog-list">
            {blogs.map(blog => (
                <div className="feed"  key={blog._id}>

                    <a href={"/blogs/"+blog._id}>
                    <h5>{ blog.title }</h5>
                    </a>
                    <p>Posted by <a href={"/users/"+blog.author.username}>{blog.author.username}</a></p>
                        {blog.picture !== '' && blog.picture !== 'no pic' &&
                        <div className="feed-image">
                        <img style={{width:"100%", height:"70%", objectFit:"cover"}} 
                        src={blog.picture} />
                        </div>
                        }
                <div className="feed-content"  >
                    <i className="material-icons">favorite_border</i>
                    <div>
                    {blog.tags.map(tag => <h6> {tag}</h6>)}
                        </div>
                    <p>{ blog.body?.length > 20 ? blog.body.substr(0, 20)+'...' : blog.body  }</p>
                    <input type="text" placeholder="Add your comment" />
                </div>
                </div>
            ))}

        </div>
    );

}

export default BlogList;