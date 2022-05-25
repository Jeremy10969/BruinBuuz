//responsible to handle requests come to the server
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const signUpTemplateCopy = require('../models/usrmodels')//import schema in usrmodels.js
const User=mongoose.model("usrtable")
const jwt = require('jsonwebtoken')
JWT_SECRET="123qweasd"
const requireLogin = require('../middleware/requireLogin')

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

router.post('/signin',(req,res)=>{
   const {email,password}= req.body
   if(!email || !password)//email or password can not be empty
   {res.status(422).json({error:"please add email or password"})}
   User.findOne({email:email}).then(savedUser=>{
      if (!savedUser){return res.status(422).json({error:"Invalid Email or password"})}
      else {
         if(password==savedUser.password){
            const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
            res.json({token:token})
         }
         else{return res.status(422).json({error:"Invalid password"})}
      }
   }).catch(err=>{console.log(err)})
})


router.get('/protected',requireLogin,(req,res)=>{
   res.send("Look at protected")
})


//export the router
module.exports = router