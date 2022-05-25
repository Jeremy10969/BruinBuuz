const mongoose = require('mongoose')//import mongoose
const {ObjectId} = mongoose.Schema.Types  // used to extract user ID

const blogTemplate = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    tags:{
        type: String,
        required: false,
        default: "no tag",
    },
<<<<<<< HEAD
    body:{
        type: String,
        required: true,
    },
    picture:{
        type: String,
        default: "no pic",
    },
    author:{
        type: ObjectId,
        ref: "usrtable",  // might need to change depends on Aloe
        required: false,
=======
    bodyGraph:{
        type:String,
        required:true
>>>>>>> 5e115c38427dd1f0fab9897bfe0715df866a894e
    },
    date:{
        type: Date,
        default: Date.now
    }
}, {  timestamps: true  });

module.exports = mongoose.model('Blogtable', blogTemplate);