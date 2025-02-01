import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
    {
        email :{
            type:String,
            required:true,
            unique:true
        },
        fullname :{
            type:String,
            required:true
        },
        password :{
            type:String,
            required:true,
            minlength: 6
        },
        ProfilePic :{
            type:String,
            default: ""
        }
    } ,
    {timestamps:true}
);

const User = mongoose.model('User' , Userschema);
export default User;