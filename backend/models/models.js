const mongoose = require('mongoose')//import mongoose
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
  }
})

//export the schema
//model takes 2 argument: first is name of table, second is name of schema we created
module.exports = mongoose.model('mytable', signUpTemplate)