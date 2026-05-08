import mongoose, { model } from "mongoose";

const managementSchema=new mongoose.Schema({
    roomNum:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
  
    floor:{
        type:String,
        required:true,
        enum:["Ground","1st","2nd","3rd"],
        default:"Ground"
    },
    status:{
        type:String,
        enum:["Available","Allocated"],
        default:"Available"
    }
},{timestamps:true})
const RoomManagement=mongoose.model("Room-Management",managementSchema)
export default RoomManagement