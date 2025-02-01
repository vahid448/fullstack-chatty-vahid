import {generateToken} from "../lib/utils.js";
import User from "../Models/user.model.js";
import becrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";



export const  signup  = async (req, res) => {
 const {fullname , email , password} = req.body;
  
 try{
   if(!fullname || !email || !password){
    return res.status(400).json({ message : "all fields are require"});
   }


   if(password.length < 6){
    return res.status(400).json({ message : "password must be at least 6 characters"});
   }

   const user = await User.findOne({email})

   if(user) return res.status(400).json({message: "email already exists"});

   const salt = await becrypt.genSalt(10);
   const hashePassword = await becrypt.hash(password,salt);

   const newUser = new User({
    fullname,
    email,
    password:hashePassword
   })

   if(newUser){
    generateToken(newUser._id , res)
    await newUser.save();

    res.status(201).json({
        _id:newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        ProfilePic: newUser.ProfilePic
    })
   }else{
    res.status(400).json({message: "invalid user data"})
   }
 }catch(err){
   console.log("error is signup controller is " + err.message);
   res.status(500).json({message: "internal server error"})
 }
}

export const login = async (req, res) => {
 const {email , password} = req.body
 try{

  const user = await User.findOne({email})
  if(!user){
   return res.status(400).json({message:"this is invalid email"})
  }

 const ispasswordCorrect = await becrypt.compare(password , user.password);
 if(!ispasswordCorrect){
   return res.status(400).json({message:"this is invalid password"})
 }

generateToken(user._id , res);

res.status(200).json({
  _id:user._id,
  fullname:user.fullname,
  email:user.email,
  profilePic:user.profilePic
})

 }catch(err){
  console.log("error is in login controlled" , err.message);
  res.status(500).json({message:"internal server error"})
 }
} 

export const logout = (req, res) => {
    try{
     res.cookie("jwt" , "" , {maxAge:0})
     res.status(200).json({message: "logged out successfully"});
    }catch(err){
     console.log("error in logout controller" , err.message);
    }
}

export const updateProfile = async (req , res) => {
  try{
    const {ProfilePic} = req.body;
    const userId = req.user._id;
   
    if(!ProfilePic){
      return res.status(400).json({message:"profile pic is required"});

    }

    const uploadResponse = await cloudinary.uploader.upload(ProfilePic);
    const updateUser = await User.findByIdAndUpdate(userId , 
    {ProfilePic:uploadResponse.secure_url},
    {new:true}
    );
    res.status(200).json(updateUser)

  }catch(err){
    console.log("error in update profile :" , err);
    res.status(500).json({message:"internal server error"})
    
  }
}

export const checkAuth = (req, res) => {
  try{
    res.status(200).json(req.user);
  }catch(err){
    console.log("error is checkAuth controller :" ,err);
    res.status(500).json({message:"internal server error"})
  }
}
