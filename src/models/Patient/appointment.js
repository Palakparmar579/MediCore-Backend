import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
{
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
     required: true  
  },
 
  firstName: String,
  mobNumber: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  age: { type: String, required: true },
  email: String,

  
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorDepartment",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roomNum: { type: String, required: true },
  appDate: { type: Date, required: true },
  time: { type: String, required: true },
  healthIssue: { type: String, required: true },

 
  bookingStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },

 
  doctorNote: { type: String, default: "" },

  medicines: [
    {
      name: String,
      dosage: String,
    },
  ],
reportSent:{
  type: Boolean,
  default: false,
},
  followUp: { type: String, default: "" },
},


{ timestamps: true }
);


const Appointment = mongoose.model("Book-Appointment", appointmentSchema);

export default Appointment;