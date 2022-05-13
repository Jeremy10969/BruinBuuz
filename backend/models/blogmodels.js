const mongoose = require('mongoose')//import mongoose
const blogTemplate = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    tags:{
        type:String,
        required:false
    },
    bodyGraph:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('blogtable', blogTemplate)