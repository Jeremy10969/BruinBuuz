
import PostEntrance from "./PostEntrance";

const PostEntranceList = ({posts}) => {
    return (

        posts.length?<div className="gallery"> {posts.map(PostEntrance)}</div>:<div className="gallery-post-grid"></div>
    
        
    );


}

export default PostEntranceList;