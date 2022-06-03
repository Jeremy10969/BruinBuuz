const mongoose = require('mongoose')//import mongoose
const {ObjectId} = mongoose.Schema.Types  // used to extract user ID

const blogTemplate = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    tags:{
        type: Array,
        default:[],
        required:false
    },
    body:{
        type: String,
        required: true,
    },
    picture:{
        type: String,
        default: "no pic",
    },
    likes:
    
    [{
        type: ObjectId,
        ref: "usrtable",
    }],
    comments:[{
        text: String,
        author: {
            type: ObjectId,
            ref: "usrtable",
            autopopulate: true
        },
    }],
    author:{
        type: ObjectId,
        ref: "usrtable",  // might need to change depends on Aloe
        required: true,   // need to change
        autopopulate: {select:'username picture followers following tags'}
    },
    date:{
        type: Date,
        default: Date.now
    },
    
    heat:{
        type:Number,
        default: 0
    }

}, {  timestamps: true  });

blogTemplate.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Blogtable', blogTemplate);