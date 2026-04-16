import mongoose from "mongoose";
 
const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorDep"
  }
},
{timestamps:true}
);
const Doctor=mongoose.model("Doctor",doctorSchema)
export default Doctor;