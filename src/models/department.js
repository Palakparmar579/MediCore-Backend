import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
 
  department: {
    type: String,
    required:true,
    trim:true
  },
  description: {
    type: String,
    require:true
  },
  deptNum:{
    type:Number,
    trim:true,
    minlength:4,
    required:true
  },
  status:{
    type:String,
    enum:["active","inactive"],
    default:"active"
  }
}, {
  timestamps: true, 
});

const DoctorDep = mongoose.model("DoctorDepartment", doctorSchema);
export default DoctorDep;