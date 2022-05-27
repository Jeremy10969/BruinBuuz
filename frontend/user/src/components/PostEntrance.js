const PostEntrance = (post) => (
    
   <div>   
       {post.picture=="no pic"? 
        <div key={post._id}>
        <h5>{ post.title }</h5>
        <p>Written by ...</p>
     <div>
     
        <h6>Tag TB Implemented</h6>
        <p>{ post.body }</p>
     
     </div>
     </div> 

       :
       <div className="gallery-post-grid">
           <div className="cover-image">      
                <img style={{width:"100%", height:"100%", objectFit:"cover"}} src={post.picture} />
            </div>
            <div className="hidden-elements">
                <div key={post._id}>
                    <h5>{ post.title }</h5>
                    <p>Written by ...</p>
                <div>
                
                    <h6>Tag TB Implemented</h6>
                    <p>{ post.body }</p>
                
                </div>
                </div> 
            </div>
       </div>   }
        
        
</div>
 
)

export default PostEntrance;