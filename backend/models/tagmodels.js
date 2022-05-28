const mongoose = require('mongoose')//import mongoose

const tagTemplate = new mongoose.Schema({
    content:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('tagtable', tagTemplate)