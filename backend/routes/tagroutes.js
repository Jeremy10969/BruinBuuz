const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const tagTemplateCopy = require('../models/tagmodels')

router.post('/addtag/:tagname',(req,res)=>{
    const name = req.params.tagname;
    tagTemplateCopy.exists({content:name}, function (err,doc){
        if (err){console.log(err);}
        else{
            if(doc === null)
            {
                const newTag= new tagTemplateCopy({
                             content:name
                        });
                         newTag.save().then(data => {
                            res.json({data});
                            console.log("new tag added");})
                             .catch(error => {
                                 res.json(error);
                             console.log(error);})
            }
            else{console.log("do not add duplicate tags");}
        }
    });
  
    
})

module.exports = router;