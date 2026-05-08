import Appointment from '../../models/Patient/appointment.js'
import DoctorDep from '../../models/department.js';
import User from '../../models/user.js'
import RoomAllocation from '../../models/RoomAllocation.js';

import AssignDept from "../../models/AssignDept.js"
import mongoose from 'mongoose';
// POST API

export const register = async (req, res) => {
  try {
    const { firstName, mobNumber, gender, address, dob, age, email, 
            department, appDate, doctor, roomNum, time, healthIssue } = req.body;

    if (!mobNumber || !gender || !address || !dob || !department || !appDate || !time || !healthIssue) {
      return res.status(400).json({ message: "Not all fields have been entered." });
    }

    const departmentExists = await DoctorDep.findById(department);
    if (!departmentExists) return res.status(400).json({ message: "Selected department does not exist" });

    const existing = await Appointment.findOne({ appDate, time, department });
    if (existing) {
      return res.status(400).json({
        message: `Time slot "${time}" on ${appDate} is already booked. Please select another time.`
      });
    }

    
    const appointment = await Appointment.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, appointment });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Appointment.find({ user: userId })
      .populate("department", "department")
      .populate("doctor", "name");

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const pagination = async (req, res) => {
  try {
    const userId = req.user.id; 
    console.log("req.user →", req.user);      
    console.log("userId →", userId);    
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;

    const users = await Appointment.find({ user: userId })  
      .populate("department", "department")
      .populate("doctor", "name room")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Appointment.countDocuments({ user: userId });  
    const totalPages = Math.ceil(total / limit);

    return res.json({
      page,
      limit,
      total,
      totalPages,
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

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




export const getBookedSlots = async (req, res) => {
  try {
    const { date, department } = req.query;

    const booked = await Appointment.find({
      appDate: date,
      department,
    }).select("time");

    const bookedSlots = booked.map((b) => b.time);

    return res.json({
      success: true,
      bookedSlots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





export const getAvailableDoctors = async (req, res) => {
  try {
    const { department } = req.query;

    const allocated = await RoomAllocation.find({
      department,
      status: "Allocated",
    }).populate("doctor");

    const doctors = allocated.map((a) => a.doctor);

    return res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// get allocated detail of department and doctor

export const getAllocatedDoctorsByDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignDept = await AssignDept.findOne({
      department: id,
    });

    if (!assignDept) {
      return res.json({ success: true, doctors: [] });
    }

    const data = await RoomAllocation.find({
      department: assignDept._id,
      status: "Allocated",
    })
      .populate("doctor", "name")
      .populate("room", "roomNum");
         
    const doctors = [
      ...new Map(
        data.map((item) => [
          item.doctor._id.toString(),
          {
            _id: item.doctor._id,
            name: item.doctor.name,
            room: item.room?.roomNum, 
          },
        ])
      ).values(),
    ];

    res.json({
      success: true,
      doctors,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )
      .populate("department", "department")
      .populate("doctor", "name");

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      appointment: updatedAppointment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getAppointmentById =async(req,res)=>{
  const {id}=req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid appointment ID" });
  }
  try{
    
    const appointment = await Appointment.findById(id)
       .populate("department","department")
       .populate("doctor","name")
   if(!appointment){
    res.status(401).json({message:"Appointment not found!"})
   }
       res.status(200).json({success:true,data:appointment})
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
}


export const getAllAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.find(); 
        res.status(200).json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getAcceptedAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.find({bookingStatus:{$nin:['rejected','pending']}
        }
        ); 
       
        res.status(200).json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};