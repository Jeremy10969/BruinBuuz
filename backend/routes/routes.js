//responsible to handle requests come to the server
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/models')//import schema in models.js

//handle post request from user on /signup page
router.post('/signup', (request, response)=>{
   //create an new instance of signuptemplatecopy/schema
    const signedUpUser = new signUpTemplateCopy({
       fullName:request.body.fullName,//value from post request content
       username:request.body.username,//is the value that users enter
       email:request.body.email,
       password:request.body.password
    //no need to pass in date because save by default
   })
   //save the complete template
   signedUpUser.save()
   .then(data =>{response.json(data)})//if everything success, send response to json with data
   .catch(error =>{response.json(error)})//if has error, catch it and send it as json file also
})
//this one handle the request when usr hit signup，post run
//(request,response) is a callback function with two argument




//export the router
module.exports = router