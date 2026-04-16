import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    
    },
   
    mobNumber: {
      type: String,
      required: true, 
    },
    gender: {
      type: String,
      required: true, 
      enum: ["Male", "Female", "Other"],
    },
    address: {
      type: String,
      required: true, 
      trim: true,
    },
    dob: {
      type: Date,
      required: true, 
    },
    email: {
      type: String,
     
    },
    department: {
  type: mongoose.Schema.Types.ObjectId, 
  ref: "DoctorDepartment", 
  required: true,
},
    appDate: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
   healthIssue: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } 
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;