const express = require('express')
const router = express.Router()
const blogTemplateCopy = require('../models/blogmodels')//import schema in blogmodels.js

router.post('/post-blog', (request,response)=> {
    const toBePostBlog = new blogTemplateCopy ({
        title:request.body.title,
        tags:request.body.tags,//TODO: be modified later
        bodyGraph:request.body.bodyGraph
    })
    toBePostBlog.save()
    .then(data =>{response.json(data)})//if everything success, send response to json with data
   .catch(error =>{response.json(error)})//if has error, catch it and send it as json file also
})

router.get('/all-blog', (request,response)=>{
    blogTemplateCopy.find().sort({date:-1}).then(result =>
        response.json(result)).catch(err => {console.log(err);})
})
module.exports = router