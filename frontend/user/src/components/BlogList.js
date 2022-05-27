import Blog from './Blog'
const BlogList = ({ blogs }) => {
    return (
        <div className="blog-list">
            {blogs.map(Blog)}

        </div>
    );

}

export default BlogList;