import Appointment from "../../models/Patient/appointment.js";  
import AssignDept from "../../models/AssignDept.js";
import User from "../../models/user.js";
import { reportTemplate } from "../../../utils/emailTemplates.js";
import sendEmail from '../../services/emailService.js';



export const getAppointmentByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
  
    const assignment = await AssignDept.findOne({ doctors: doctorId });

    if (!assignment) {
      return res.status(404).json({ message: "No department assigned" });
    }

    const appointments = await Appointment.find({
      doctor: doctorId 
    }).populate("department");

    res.status(200).json(appointments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, experience } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        name: name?.trim(),
        phone: phone?.trim(),
        experience: experience?.trim(),
      },
      { new: true }
    ).select("-password");

    res.status(200).json({ success: true, user });

  } catch (error) {
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
    res.status(500).json({ message: "Server error" });
  }
};

export const submitPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorNote, medicines, followUp, bookingStatus } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Appointment ID is required!" });
    }

    if (!doctorNote || !medicines || !followUp || !bookingStatus) {
      return res.status(400).json({ message: "All fields are required!" });
    }

   
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { doctorNote, medicines, followUp, bookingStatus},
      { new: true }
    )
      .populate("department", "department")
      .populate("doctor", "name");

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Prescription submitted successfully",
      data: updatedAppointment,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookingStatus } = req.body;  

    if (!bookingStatus) {
      return res.status(400).json({ message: "bookingStatus is required" });
    }

  
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.bookingStatus = bookingStatus;  
    await appointment.save();

    return res.status(200).json({
      message: "Status updated",
      bookingStatus: appointment.bookingStatus,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAppointmentDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate("doctor", "name")
      .populate("department", "department");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const generateReport = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

  
    if (!appointment.email) {
      return res.status(400).json({ message: "Patient email not found" });
    }

   console.log(appointment.email)
    
   const reportData = {
      doctorNote: appointment.doctorNote,
      medicines: appointment.medicines,
      followUp: appointment.followUp,
    };

    await sendEmail({
      to: appointment.email,
      subject: "Your Medical Report - MediCore",
      html: reportTemplate(appointment.firstName, reportData),
    });
   appointment.reportSent = true;
await appointment.save();
    res.json({ message: "Report sent successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const AppointmentStats=async(req,res)=>{
  try{
   
    const pendingStats=await Appointment.countDocuments({bookingStatus:"pending"})
     const acceptedStats=await Appointment.countDocuments({bookingStatus:"accepted"})
      const rejectedStats=await Appointment.countDocuments({bookingStatus:"rejected"})
       const totalStats=await Appointment.countDocuments();
        return res.json({
    accepted:acceptedStats,
    rejected:rejectedStats,
    pending:pendingStats,
    total:totalStats
  })
  }

  catch(error){
    res.status.json({message:error.message})
  }
}


