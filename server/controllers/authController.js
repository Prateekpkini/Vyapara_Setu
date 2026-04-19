const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
exports.registerUser = async (req,res)=>{
try{

const {
name,
email,
password,
phone,
type,
business,
city,
state,
category,
gst,
digilockerVerified
} = req.body;

const userExists = await User.findOne({email});

if(userExists){
return res.status(400).json({error:"User already exists"});
}

const hashedPassword = await bcrypt.hash(password,10);

const user = await User.create({
name,
email,
password:hashedPassword,
phone,
type,
business,
city,
state,
category,
gst,
digilockerVerified
});

res.status(201).json(user);

}catch(error){

res.status(500).json({error:error.message});

}
};


// LOGIN USER
exports.loginUser = async (req,res)=>{
try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.status(404).json({error:"User not found"});
}

const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){
return res.status(401).json({error:"Invalid credentials"});
}

const token = jwt.sign(
{ id:user._id },
process.env.JWT_SECRET,
{ expiresIn:"7d" }
);

res.json({
token,
user
});

}catch(error){

res.status(500).json({error:error.message});

}
};