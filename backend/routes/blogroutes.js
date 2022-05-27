const express = require('express');
const router = express.Router();
const Blog = require('../models/blogmodels');//import schema in blogmodels.js
const requireLogin = require('../middleware/requireLogin');
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
    //TODO: More search types // not sure require login or not
    const searchType = req.query.searchType;
    const content = req.params.content;
    console.log("Search content:" + content);
    console.log("Search Type: "+ searchType);
    Blog.find({title:content})
        .then(result => {
           res.json(result);
        })
        .catch(error => { 
            res.json(error);
            console.log(error);
        });
});

router.get('/all-blog',requireLogin,  (req, res) => {
    Blog.find().populate("author", "_id name").sort({ createdAt:-1 })
        .then(result => {
           res.json(result);
           console.log("getting all blogs.")
        })
        .catch(error => { 
            res.json(error);
            console.log(error);
        });
});

router.get('/my-posts', requireLogin, (req, res) => {
    const id = req.user._id;
    Blog.find({author: id})
    .populate("author", "_id name").sort({ createdAt:-1 })
    .then(myposts => {
        res.json(myposts);
    })
    .catch(err => {  console.log(err); });
});

// display one post in detail
router.get('/:id',requireLogin, (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
});

module.exports = router;