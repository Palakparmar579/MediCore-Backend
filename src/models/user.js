import mongoose from "mongoose";

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
        minlength:10,
        required:true
    },
    role:{
        type:String,
        enum:["admin","patient","doctor","nurse"],
        default:"admin"
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
},{
    timestamps:true
})
// ✅ Model Create

const User=mongoose.model("User",userSchema)
export default User;