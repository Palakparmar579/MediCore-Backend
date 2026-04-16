import mongoose, { model, Schema } from 'mongoose'

const userSchema=new mongoose.Schema({
       email:{
        type:String,
        unique:true,
        required:true,
        trim:true
       },
       status:{
        type:String,
        enum:["accepted","pending","rejected"],
        default:"pending"
       },
       role:{
        type:String
       },
        password: {
      type: String, // will be set after accept
    },
},{
timestamp:true}
) 
const UserRequest=mongoose.model("Request-Table",userSchema);
export default UserRequest;