import Appointment from '../../models/Patient/appointment.js'
import DoctorDep from '../../models/department.js';
import User from '../../models/user.js'
// POST API

export const register =  async (req, res) => {
  try {
    const { firstName, mobNumber, gender, address, dob, email, department, appDate, time,healthIssue } = req.body;
     if(!mobNumber||!gender||!address||!dob||!department||!appDate||!time||!healthIssue){
        return res.status(400).json({
        message: "Not all fields have been entered.",
      });
     }
    
    const departmentExists = await DoctorDep.findById(department);
    if (!departmentExists) return res.status(400).json({ message: "Selected doctor/department does not exist" });
   const existing = await Appointment.findOne({
  appDate: appDate,  
  time,
  department
});
if (existing) {
  return res.status(400).json({
    message:  `Time slot "${time}" on ${appDate} is already booked. Please select another time.`

  });
}
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}


export const getAppointment = async (req, res) => {
  try {
    const data = await Appointment.find()
      .populate("department", "name")
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Pagination

export const pagination=async(req,res)=>{
  try{
const page=parseInt(req.query.page);
const limit=parseInt(req.query.limit);
const skip=(page-1)*limit;
const users=await Appointment.find()
.populate("department", "department")
.skip(skip).limit(limit).sort({createdAt:-1})
const total=await Appointment.countDocuments()
const totalPages=Math.ceil(total/limit)
return res.json({
  page,
  limit,
  total,
  totalPages,
  data:users
})
  }
  catch(error){
   console.error(error);
   return res.status(500).json({ message: error.message });
  }
}


// Profile Upload api
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const {name,phone,dob,address} = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name: name?.trim(), 
       phone: phone?.trim(),
       dob:dob?.trim(),
       address:address?.trim()
       
       },

      { new: true }
    ).select("-password");

 
    res.status(200).json({
  success: true,
  user
});

console.log(user)

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




