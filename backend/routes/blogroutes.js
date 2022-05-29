const express = require('express');
const router = express.Router();
const Blog = require('../models/blogmodels');//import schema in blogmodels.js
const requireLogin = require('../middleware/requireLogin');
const User = require('../models/usrmodels');
const { json } = require('express');
//add requireLogin to create-blog my-posts

router.post('/Create',requireLogin, (req, res) => {
    const {title, body, picture} = req.body;
    console.log(title, body, picture);
    
    if (!title || !body) {
        return res.status(422).json({error: "Please add all the fields"})
    }

    // req.user.password = undefined; // to hide the passwd
    const newBlog = new Blog ({
        title,
       // tags,//TODO: be modified later
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
    //TODO: More search types
    const searchType = req.query.searchType;
    const content = req.params.content;
    console.log("Search content:" + content);
    console.log("Search Type: "+ searchType);
    Blog.find({title:content})

    .sort({ createdAt:-1 })
        .then(result => {
           res.json(result);
        })
        .catch(error => { 
            res.json(error);
            console.log(error);
        });
});

router.get('/all-blog',requireLogin,  (req, res) => {
    Blog.find()
    .sort({ createdAt:-1 })
        .then(result => {
           res.json(result);
           console.log("getting all blogs.")
        })
        .catch(error => { 
            res.json(error);
            console.log(error);
        });
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
    console.log(id);

    Blog.findById(id)

    .sort({ createdAt:-1 })
      .then(result => {
          console.log(result)
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
          console.log(result)
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
})

router.put('/like', requireLogin, (req, res) => {
    Blog.findByIdAndUpdate(req.body.blogId, {
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




module.exports = router;