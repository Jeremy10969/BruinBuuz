<<<<<<< HEAD
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
    return (
        <div className="blog-list">
            {blogs.map(blog => (
                <div className="feed"  key={blog._id}>
                    <Link to={`/blogs/${blog._id}`}>
                    <h5>{ blog.title }</h5>
                    </Link>
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
                    <p>{ blog.body?.length > 20 ? blog.body.substr(0, 20)+'...' : blog.body  }</p>
                    <input type="text" placeholder="Add your comment" />
                </div>
                </div>
            ))}
=======
import Blog from './BlogFormat'
const BlogList = ({ blogs }) => {
    return (
        <div className="blog-list">
            {blogs.map(Blog)}
>>>>>>> 67ee44536baa633e97d7d7217badd44a249d94ed

        </div>
    );

}

export default BlogList;