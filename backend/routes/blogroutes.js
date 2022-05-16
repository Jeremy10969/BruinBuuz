const express = require('express')
const router = express.Router()
const Blog = require('../models/blogmodels')//import schema in blogmodels.js


router.get('/', (req, res) => {
    const blogs = [
      {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('home', { title: 'Home', blogs });
});

router.post('/post-blog', (request,response)=> {
    const toBePostBlog = new blogTemplateCopy ({
        title:request.body.title,
        tags:request.body.tags,//TODO: be modified later
        bodyGraph:request.body.bodyGraph
    })
    toBePostBlog.save()
    .then(data =>{response.json(data)})//if everything success, send response to json with data
    .catch(error =>{response.json(error)})//if has error, catch it and send it as json file also
});

router.get('/all-blog', (req, res)=>{
    Blog.find().sort({ createdAt:-1 })
        .then(result => {
            res.render('home', {blogs: result, title: 'All blogs'});
        })
        .catch(err => { console.log(err); });
});

module.exports = router