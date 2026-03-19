import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
       age:{
        type:Number,
        required:true
    },
       description:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        trim:true,
        minlength:8,
        required:true
    },
    role:{
        type:String,
        enum:["admin","patient","doctor","nurse"],
        default:"admin"
    }

},{
    timestamps:true
})
// ✅ Model Create

const User=mongoose.model("User",userSchema)
export default User;