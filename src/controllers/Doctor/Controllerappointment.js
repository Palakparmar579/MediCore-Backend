import Appointment from "../../models/Patient/appointment.js"; 
import AssignDept from "../../models/AssignDept.js";
import User from "../../models/user.js";

export const getAppointmentByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    console.log("Doctor ID:", doctorId);

   
    const assignment = await AssignDept.findOne({ doctors: doctorId });

    if (!assignment) {
      return res.status(404).json({ message: "No department assigned" });
    }

    console.log("Department ID:", assignment.department);

    
    const appointments = await Appointment.find({
      department: assignment.department
    }).populate("department");

    res.status(200).json(appointments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// Profile Upload api
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const {name ,department,deptNum,phone,experience } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name: name?.trim(), 
       phone: phone?.trim(),
       experience:experience?.trim(),
       
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



export const getDoctorDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

   
   
     const assignment = await AssignDept.findOne({ doctors: userId })
  .populate("doctors", "name email phone experience profileImage")
  .populate("nurses", "name email")
  .populate("department"); 
      
   
    if (!assignment) {
      return res.json({
        doctor: null,
        department: null,
        otherDoctors: [],
        nurses: [],
      });
    }

    
    const loggedDoctor = assignment.doctors.find(
      (doc) => doc._id.toString() === userId
    );

   
    const otherDoctors = assignment.doctors.filter(
      (doc) => doc._id.toString() !== userId
    );

    res.json({
  doctor: loggedDoctor,
  department: assignment.department,  
  deptNum: assignment.deptNum,
  otherDoctors,
  nurses: assignment.nurses,
});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



