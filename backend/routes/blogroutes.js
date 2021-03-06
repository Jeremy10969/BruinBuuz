const express = require('express');
const router = express.Router();
const Blog = require('../models/blogmodels');//import schema in blogmodels.js
const requireLogin = require('../middleware/requireLogin');
const User = require('../models/usrmodels');
const { json } = require('express');
//add requireLogin to create-blog my-posts

router.post('/Create',requireLogin, (req, res) => {
    const {title, body, picture, tags} = req.body;
    //console.log(title, body, picture, tags);
    
    if (!title || !body || tags.length==0) {
        return res.status(422).json({error: "Please add all the required fields"})
    }

    // req.user.password = undefined; // to hide the passwd
    const newBlog = new Blog ({
        title,
        tags,//TODO: be modified later
        body,
        picture,
        author: req.user,
    })
    newBlog.save()
    .then(data =>{
        res.json({newblog: data});
        console.log("blog uploading to database.")
    })//if everything success, send response to json with data
    .catch(error =>{
        res.json(error);
        console.log(error);
    });//if has error, catch it and send it as json file also
});

router.get('/search/:content',requireLogin, (req, res) => {
    const searchFilters = req.query.searchType;
    const searchType = searchFilters.split(" ")[0];
    const filterType = searchFilters.split(" ")[1]
    //console.log(searchType);
    const content = req.params.content;
    //console.log(content);
    let conditions = {};
    
    User.find({username: new RegExp(content, 'i')},{"password":0})
    .then(userid => {
        if(searchType == "author"){
            conditions['author'] = userid
        }
        else if (searchType == "title"){
            conditions['title'] = new RegExp(('\\b' + content + '\\b'), 'i')
        }
        else if (searchType == "tags"){
            let tags = content.split(" ")
            let regex = [];
            for (let i = 0; i < tags.length; i++) {
                regex.push(new RegExp(('\\b' + tags[i] + '\\b'), 'i')) ;
            }
            conditions['tags'] = {$all:regex}
        }
        else if (searchType == "content"){
            conditions['body'] = new RegExp(('\\b' + content + '\\b'), 'i')
        }
    })
    .then(
        result=>{
            Blog.find(conditions)
            .sort(filterType=="latest"?{ createdAt:-1 }:{createdAt:1})
                .then(result => {
                   res.json(result);
                })
                .catch(error => { 
                    res.json(error);
                    console.log(error);
                });
        }
    )
    
    
});

router.get('/all-blog',requireLogin,  (req, res) => {
    Blog.find().sort({heat: -1, createdAt: -1})
        .then(result=>{
            res.json(result);
            console.log("getting all blogs.")
        })
          

        .catch(error => { 
            res.json(error);
            console.log(error);
        });

    })
router.get('/feed', requireLogin, (req, res) => {

    const tags = req.user.tags;
    //console.log(tags)
    Blog.find({tags:{$in: tags}})
    .sort({ createdAt:-1 })
    .then(feed => {
        res.json(feed);
    })
    .catch(err => {  console.log(err); });
});



router.get('/myblogs', requireLogin, (req, res) => {

    const id = req.user._id;
    Blog.find({author: id})
    .sort({ createdAt:-1 })
    .then(myposts => {
        res.json(myposts);
    })
    .catch(err => {  console.log(err); });
});

// display one post in detail
router.get('/blogs/:blogid', requireLogin, (req, res) => {
    const id = req.params.blogid;
    //console.log(id);

    Blog.findByIdAndUpdate(id, {$inc:{heat: 0.5}})
    .sort({ createdAt:-1 })
      .then(result => {
          //console.log(result)
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
});

router.get('/bloglist/:userid', requireLogin, (req,res)=>{
  const id = req.params.userid;
    Blog.find({author: id})
    .sort({ createdAt:-1 })
      .then(result => {
          //console.log(result)
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
})

router.get('/tags/:tag', requireLogin, (req,res)=>{
    const tag = req.params.tag;
      Blog.find({tags:{$all: tag}})
      .sort({ createdAt:-1 })
        .then(result => {
            // console.log(result)
          res.json(result);
        })
        .catch(err => {
          console.log(err);
        });
  })

router.put('/like', requireLogin, (req, res) => {
    Blog.findByIdAndUpdate(req.body.blogId, {
        $inc:{heat: 5},
        $push: {likes: req.user._id}
    }, {
        new: true
    }).exec((err, result) => {
        if(err){
            return res.status(422).json({error:err})
        } else {
            res.json(result)
        }
    })
})

router.put('/unlike', requireLogin, (req, res) => {
    Blog.findByIdAndUpdate(req.body.blogId, {
        $inc:{heat: -5},
        $pull: {likes: req.user._id}
    }, {
        new: true
    }).exec((err, result) => {
        if(err){
            return res.status(422).json({error:err})
        } else {
            res.json(result)
        }
    })
})

router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        
        text: req.body.text,
        author: req.user._id,
    };
    Blog.findByIdAndUpdate(req.body.blogId, {
        $inc:{heat: 10},
        $push: {comments: comment}
    }, {
        new: true
    })
    .exec((err, result) => {
        if(err){
            return res.status(422).json({error:err})
        } else {
            res.json(result)
        }
    })
})

router.put('/uncomment', requireLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        author: req.user._id,
    };
    Blog.findByIdAndUpdate(req.body.blogId, {
        $inc:{heat: 10},
        $pull: {comments: comment}
    }, {
        new: true
    })
    .exec((err, result) => {
        if(err){
            return res.status(422).json({error:err})
        } else {
            res.json(result)
        }
    })
})

router.delete('/deleteBlog/:blogid', requireLogin, (req, res) => {
    Blog.findOne({_id: req.params.blogid})
    .populate("author", "_id")
    .exec((error, blog) => {
        if(error || !blog){
            return res.status(422).json({error: error})
        }
        if(blog.author._id.toString() === req.user._id.toString()){
            blog.remove()
            .then(result => {
                res.json(result)
            }).catch(error => {
                console.log(error)
            })
        }
    })
})


module.exports = router;