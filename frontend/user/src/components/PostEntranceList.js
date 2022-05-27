
import PostEntrance from "./PostEntrance";

const PostEntranceList = ({posts}) => {
    return (
        <div className="gallery"> {posts.map(PostEntrance)}</div>
    );


}

export default PostEntranceList;