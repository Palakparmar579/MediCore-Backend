import Appointment from "../../models/Patient/appointment.js"; 
import AssignDept from "../../models/AssignDept.js";

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