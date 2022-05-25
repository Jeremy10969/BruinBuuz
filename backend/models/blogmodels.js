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
    },
    date:{
        type: Date,
        default: Date.now
    }
}, {  timestamps: true  });

module.exports = mongoose.model('Blogtable', blogTemplate);