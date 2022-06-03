//responsible to handle requests come to the server
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const signUpTemplateCopy = require('../models/usrmodels')//import schema in usrmodels.js
const User = mongoose.model("usrtable")
const jwt = require('jsonwebtoken')
JWT_SECRET = "123qweasd"
const requireLogin = require('../middleware/requireLogin')
const { route } = require('./blogroutes')

//handle post request from user on /signup page
router.post('/signup', (request, response) => {

   signUpTemplateCopy.exists({email:request.body.email}, function (err,doc){
      if (err){console.log(err);}
      else{
         if (doc==null)
         { 
            signUpTemplateCopy.exists({username:request.body.username}, function (e,d){
               if (e){console.log(e)}
               else {
                  if (d==null)
                  {
                     const signedUpUser = new signUpTemplateCopy({
                        fullName: request.body.fullName,//value from post request content
                        username: request.body.username,//is the value that users enter
                        email: request.body.email,
                        password: request.body.password})
                        //no need to pass in date because save by default
                  
                        signedUpUser.save()
                         .then(data => { response.json(data) })//if everything success, send response to json with data
                           .catch(error => { response.json(error) })
                  
                     }
                     else
                     {return response.status(422).json({ error: "Username already exists." })}
               }
            })
            }
          else
          {return response.status(422).json({ error: "Email already exists." })}  
      }
   })

   //create an new instance of signuptemplatecopy/schema
   //if has error, catch it and send it as json file also
})
//this one handle the request when usr hit signup，post run
//(request,response) is a callback function with two argument

router.post('/signin', (req, res) => {
   const { email, password } = req.body
   if (!email || !password)//email or password can not be empty
   { return res.status(422).json({ error: "please add email or password" }) }
   User.findOne({ email: email }).then(savedUser => {
      if (!savedUser) { return res.status(422).json({ error: "Invalid Email or password" }) }
      else {
         if (password == savedUser.password) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
            const { _id, username, email, tags } = savedUser;
            res.json({ token: token, user: { _id, username, email, tags } })
            // console.log(token)
         }
         else { return res.status(422).json({ error: "Invalid password" }) }
      }
   }).catch(err => { console.log(err) })
})


router.get('/protected', requireLogin, (req, res) => {
   res.send("Look at protected")
})


router.post('/changeprofileimg', requireLogin, (req,res) => {
   const picture = req.body.picture
   const userid = req.user._id
   console.log(userid)
   User.findByIdAndUpdate(userid, {picture: picture},{"password":0})
   .then(data =>{
      res.json({newprofilepic: data});
      console.log("photo uploaded")
  })
  .catch(error =>{
      res.json(error);
      console.log(error);
  });
}
) 

router.put('/followtag/:tagname', requireLogin, (req, res) => {
   const tagname = req.params.tagname;


   User.findByIdAndUpdate(req.user._id, { $addToSet: { tags: tagname } }, { new: true })
      .then(
         result => {
            res.json(result)
         }
      );

   //let url = "http://localhost:4000/addtag/" + tagname;
   //fetch(url, {
   //   method: "POST",
   //   headers: { "Content-Type": "application/json" }
  // })

})

router.put('/unfollowtag/:tagname', requireLogin, (req,res)=>{
   const tagname = req.params.tagname;

   User.findByIdAndUpdate(req.user._id, { $pull: { tags: tagname } },{"password":0})
   .then(result => {
      res.json(result)
   })
})

router.get('/myprofile', requireLogin, (req, res) => {
   // get req.user's info
   const userid = req.user._id;
   User.findById(userid,{"password":0}).populate("followers following")
     .then(result => {
       res.json(result);
     })
     .catch(err => {
       console.log(err);
     });
})

router.get('/users/:username', requireLogin, (req, res) => {
   const username = req.params.username;
   User.findOne({username: username},{"password":0}).populate("followers following")
     .then(result => {
       res.json(result);
     })
     .catch(err => {
       console.log(err);
     });
})

router.get('/userinfo/myself', requireLogin, (req,res) =>{
   const userid = req.user._id;
   User.findById(userid,{"password":0})
   .then(result=>{
      res.json(result);
   })
   .catch(err => {
      console.log(err);
   })
})

router.post('/tagfollowstatus', requireLogin, (req,res) => {
   const selfid = req.user._id;
   const tag = req.body.tag
   
   User.findOne({
      $and:[
         {_id: selfid},
         {tags: tag}
      ]
   },{"password":0})
   .then(
      result => {
         // console.log(result)
         res.json(result)
      }
   )
   .catch(err => {
      console.log(err);
    });
}) 

router.put('/removefollower/:otherid', requireLogin, (req,res) => {
   const selfid = req.user._id;
   const otherid = req.params.otherid;
   User.findByIdAndUpdate(selfid, { $pull: { followers: otherid } },{"password":0})
   .then(result=>res.json(result))
   .catch(err => console.log(err))
})

router.post('/getfollowstatus', requireLogin, (req,res) => {
   const selfid = req.user._id;
   const targetid = req.body.userid;
   User.findOne({ 
      $and:[
         {_id: targetid},
         {followers: selfid}
      ]
   },{"password":0})
   .then(
      result => {
         res.json(result)
      }
   )
   .catch(err => {
      console.log(err);
    });
}) 
router.post('/changefollowstatus', requireLogin, (req, res) => {
   const senderid = req.user._id;
   const receiverid = req.body.userid;
   let count = 0;
   if(senderid == receiverid){
      res.json({requeststatus: false});
   }
   else{
      User.updateOne(
         {
            _id: senderid
         },
         [
            {
               $set: {
                  following: {
                     $cond: [
                        {
                           $in: [receiverid, "$following"]
                        },
                        {
                           $setDifference: ["$following", [receiverid]]
                        },
                        {
                           $concatArrays: ["$following", [receiverid]]
                        }
                     ]
                  }
               }
            }
         ]
      ).then(result => {
         count++;
         if (count == 2) {
            res.json({requeststatus: true});
         }
      }).catch(err => {
         console.log(err);
      });
   
   
      User.updateOne(
         {
            _id: receiverid
         },
         [
            {
               $set: {
                  followers: {
                     $cond: [
                        {
                           $in: [senderid, "$followers"]
                        },
                        {
                           $setDifference: ["$followers", [senderid]]
                        },
                        {
                           $concatArrays: ["$followers", [senderid]]
                        }
                     ]
                  }
               }
            }
         ]
      ).then(result => {
         count++;
         if (count == 2) {
            res.json({requeststatus:true});
         }
      }).catch(err => {
         console.log(err);
      });
   }
  


}
)


//export the router
module.exports = router