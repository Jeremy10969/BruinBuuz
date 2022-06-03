
import PostEntrance from "./PostEntrance";

const PostEntranceList = ({posts}) => {
    return (

        posts.length?<div className="gallery"> {posts.map(PostEntrance)}</div>:<div className="gallery-post-grid"><h5>No posts associated</h5></div>
    
        
    );


}

export default PostEntranceList;