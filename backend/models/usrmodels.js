const mongoose = require('mongoose')//import mongoose
const {ObjectId} = mongoose.Schema.Types
//create a schema with mongoose
const signUpTemplate = new mongoose.Schema({
  fullName:{
      type:String,
      required: true
  },
  username:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  date:{//date will be recorded each time a new usr sign up
      type:Date,
      default:Date.now//this will now be displayed in frontend later
  },
  tags:{
      type: Array,
      default:[String],
      required:true,
  },
  followers:[{
    type: ObjectId,
    ref: "usrtable"
}],
  following:[{
    type: ObjectId,
    ref: "usrtable"
}],
picture:{
    type: String,
    default: "https://cdn.dribbble.com/users/559871/screenshots/15470728/media/9e081b71dfe6dec27a37e8c9bfc1af35.png?compress=1&resize=400x300",
},
})

//export the schema
//model takes 2 argument: first is name of table, second is name of schema we created
module.exports = mongoose.model('usrtable', signUpTemplate)