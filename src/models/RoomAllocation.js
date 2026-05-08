import mongoose, { model } from "mongoose";

const AllocationSchema=new mongoose.Schema({
 room:{
     type: mongoose.Schema.Types.ObjectId,
      ref:"Room-Management",
      required: true
 },
 
  department:{
     type: mongoose.Schema.Types.ObjectId,
      ref:"AssignDept",
      required: true
  },
  doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  nurse:{
  type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
  },
  status: {
      type: String,
      enum: ["Allocated", "Available"],
      default: "Allocated",
    },
})

const RoomAllocation=mongoose.model("Room-Allocation",AllocationSchema)
export default RoomAllocation;
