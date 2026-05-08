import AssignDept from "../models/AssignDept.js";
import RoomAllocation from '../models/RoomAllocation.js'
import RoomManagement from "../models/RoomManagement.js";
import mongoose from "mongoose";

export const getDeptById = async (req, res) => {
  try {
    const dept = await AssignDept.findById(req.params.id)
      .populate("doctors")
      .populate("nurses")
       .populate("department");
    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.json(dept);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDept = async (req, res) => {
  try {
    const dept = await AssignDept.find()
      .populate("doctors")
      .populate("nurses")
       .populate("department");
    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.json(dept);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Allocation submit api



export const assignRoom = async (req, res) => {
  try {
    const { roomId, departmentId, doctorId, nurseId } = req.body;

  
    if (!roomId || !departmentId || !doctorId || !nurseId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    const existing = await RoomAllocation.findOne({
      room: roomId,
      status: "allocated",
    });
   const existingDoctor=await RoomAllocation.findOne({doctor:doctorId})
    const existingNurse=await RoomAllocation.findOne({nurse:nurseId})
    if (existing) {
      return res.status(400).json({
        message: "Room already allocated",
      });
    }
  if(existingDoctor){
    return res.status(400).json({
        message: "This doctor is currently allocated to another room. Kindly select an alternative doctor",
      });
  }

  if(existingNurse){
    return res.status(400).json({
        message: "This nurse is currently allocated to another room. Kindly select an alternative nurse",
      });
  }
  

    const allocation = await RoomAllocation.create({
      room: roomId,
    
      department: departmentId,
      doctor: doctorId,
      nurse: nurseId,
    });

 await RoomManagement.findByIdAndUpdate(roomId, {
      status: "Allocated",
    });

    return res.status(201).json({
      message: "Room assigned successfully",
      data: allocation,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



// Get Allocated rooms 

export const getAllAllocations = async (req, res) => {
  try {
    const data = await RoomAllocation.find()
      .populate("room")
     .populate({
        path: "department",
        populate: {
          path: "department", 
        },
      })
      .populate("doctor")
      .populate("nurse");

    res.json({
      message: "All allocations fetched",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const getMyAllocations = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = new mongoose.Types.ObjectId(req.user._id); // ✅ works now after middleware fix

    let filter = {};

    if (role === "doctor") {
      filter = { doctor: userId };
    } else if (role === "nurse") {
      filter = { nurse: userId };
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    const data = await RoomAllocation.find(filter)
      .populate("room")
      .populate({ path: "department", populate: { path: "department" } })
      .populate("doctor")
      .populate("nurse");

    res.json({ message: "My allocations fetched successfully", data });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const updateRoomAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomId, departmentId, doctorId, nurseId } = req.body;

    const existingRoom = await RoomAllocation.findById(id);
    if (!existingRoom) {
      return res.status(404).json({ message: "Room assignment not found" });
    }


   
    if (roomId && roomId !== existingRoom.room.toString()) {
      const alreadyAllocated = await RoomAllocation.findOne({
        room: roomId,
        status: "Allocated",
        _id: { $ne: id },
      });

      if (alreadyAllocated) {
        return res.status(400).json({
          message: "Room already allocated",
        });
      }

       await RoomManagement.findByIdAndUpdate(existingRoom.room, {
    status: "Available",
  });

 
  await RoomManagement.findByIdAndUpdate(roomId, {
    status: "Allocated",
  });
    }

    if (roomId) existingRoom.room = roomId;
    if (departmentId) existingRoom.department = departmentId;
    if (doctorId) existingRoom.doctor = doctorId;
    if (nurseId) existingRoom.nurse = nurseId;

    const updatedRoom = await existingRoom.save();

    const populatedData = await RoomAllocation.findById(updatedRoom._id)
      .populate("room")
      .populate({
        path: "department",
        populate: { path: "department" }, 
      })
      .populate("doctor")
      .populate("nurse");

    return res.status(200).json({
      message: "Room updated successfully",
      data: populatedData,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// Pagination


export const paginationAllocation = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    const skip = (page - 1) * limit;

    const data = await RoomAllocation.find()
      .populate("room", "roomNum")
      .populate({
        path: "department",
        populate: {
          path: "department",
        },
      })
      .populate("doctor", "name")
      .populate("nurse", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await RoomAllocation.countDocuments();

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};