const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
name:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true
},

password:{
type:String,
required:true
},

phone:{
type:String,
required:true
},

type:{
type:String,
enum:["vendor","kirana"],
required:true
},

business:{
type:String,
required:true
},

city:{
type:String,
required:true
},

state:{
type:String,
required:true
},

category:{
type:String,
required:true
},

gst:{
type:String
},

digilockerVerified:{
type:Boolean,
default:false
},

role:{
type:String,
enum:["user","admin"],
default:"user"
}

},
{timestamps:true}
);

module.exports = mongoose.model("User",userSchema);