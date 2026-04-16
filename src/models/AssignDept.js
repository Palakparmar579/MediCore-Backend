import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
   department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorDepartment", 
    required: true
  },
       deptNum:{
        type:Number,
        required:true
    },
       doctors:[{
        type:mongoose.Schema.Types.ObjectId,
       ref:"User",
        required:true
    }],
    nurses:[{
        type:mongoose.Schema.Types.ObjectId,
       ref:"User",
        required:true,
    }
],
 
},
{
    timestamps:true
})


const AssignDept=mongoose.model("AssignDept",userSchema)
export default AssignDept;