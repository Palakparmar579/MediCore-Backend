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
    phone:{
        type:String 
    },
    experience:{
    type:String
    },
    address:{
        type:String
    },
    bio:{
        type:String
    },
    profileImage: {
  type: String,
  default: ""
},
department: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "DoctorDepartment",  
  default: null
},
deptNum: {
  type: Number,
  default: null
},
 dob: {
    type: Date,
  },
},{
    timestamps:true
})


const User=mongoose.model("User",userSchema)
export default User;