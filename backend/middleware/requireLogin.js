const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model("usrtable")
JWT_SECRET="123qweasd"

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authoirzation === Bearer ...sometoken...
    if (!authorization)
    {res.status(401).json({error:"you must log in"})}
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){return res.status(401).json({error:"need to log in",why:err})}
        const {_id} = payload
        User.findById(_id).then(userdata => {req.user =userdata
            next()})
        //next has to be inside to insure above find has result
    })
    

}