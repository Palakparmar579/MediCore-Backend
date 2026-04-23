import AssignDept from "../models/AssignDept.js";
import { assignEmailTemplate } from "../../utils/emailTemplates.js";
import User from "../models/user.js";
import sendEmail from '../services/emailService.js';

export const addAssignedDept = async (req, res) => {
  try {
    const { department, deptNum, doctors, nurses } = req.body;

    if (!department || !deptNum || !doctors || !nurses) {
      return res.status(400).json({
        message: "All fields are required!!",
      });
    }

    const existingDept = await AssignDept.findOne({ department });
    if (existingDept) {
      return res.status(409).json({
        message: "This department is already assigned!",
      });
    }

    const newAssignment = await AssignDept.create({
      department,
      deptNum,
      doctors,
      nurses,
    });

   
    const assignedDoctors = await User.find({ _id: { $in: doctors } });
    const assignedNurses = await User.find({ _id: { $in: nurses } });

    const allUsers = [...assignedDoctors, ...assignedNurses];

   
    for (let user of allUsers) {
      await sendEmail({
        to: user.email,
       subject: "Department Assignment - Medicore",
       html: assignEmailTemplate(user.name, "Your Department")
    });
    }

    res.status(200).json(newAssignment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get api

export const getAssignment = async (req, res) => {
  try {
    const data = await AssignDept.find()
      .populate("department")   
      .populate("doctors", "name")
      .populate("nurses", "name");

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Edit api

export const editAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { department, deptNum, doctors, nurses } = req.body;

    const updatedAssignment = await AssignDept.findByIdAndUpdate(  // ← AssignDept, not User
      id,
      { department, deptNum, doctors, nurses },
      { new: true }
    );

    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assigned department not found" });
    }

    res.status(200).json({
      message: "Assignment updated successfully",
      data: updatedAssignment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Pagination 

export const pagination=async(req,res)=>{
  try{
 const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
const search = req.query.search || "";


const skip=(page-1)*limit;


let filter = {};

if (search.trim() !== "") {
  filter.$or = [
    { department: { $regex: search, $options: "i" } },
    { description: { $regex: search, $options: "i" } },
  ];
}

const users = await AssignDept.find(filter)
  .populate("department")
  .populate("doctors", "name")
  .populate("nurses", "name")
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });
const total = await AssignDept.countDocuments(filter);const totalPages=Math.ceil(total/limit)
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