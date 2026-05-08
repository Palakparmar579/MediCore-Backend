import RoomManagement from "../models/RoomManagement.js";

export const roomManagementForm = async (req, res) => {
  try {
    const { roomNum, floor } = req.body;

    if (!roomNum || !floor) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const room = await RoomManagement.findOne({ roomNum });
    if (room) {
      return res.status(400).json({
        message: "This room number is already added try another one",
      });
    }

    
    const savedRoom = await RoomManagement.create({
      roomNum,
      floor,
    });

    return res.status(201).json({
      message: "Room created successfully",
      data: savedRoom,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const toggleStatus=async(req,res)=>{
  try{
     const room=await RoomManagement.findById(req.params.id);
     if(!room){
     return res.status(400).json({message:"User not found"})
     }
     room.status=room.status==="Available"?"Allocated":"Available"
     await room.save();
    return res.json({
      message:"Status updated",
      status:room.status
     })
  }
  catch(error){
   return res.status(500).json({message:error.message})
  }
}



export const updateRoomManagement = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomNum, floor, status } = req.body;

    const existingRoom = await RoomManagement.findById(id);

    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (roomNum && roomNum !== existingRoom.roomNum) {
      const duplicateRoom = await RoomManagement.findOne({ roomNum });

      if (duplicateRoom) {
        return res.status(400).json({
          message: "Room number already exists, try another one",
        });
      }
    }

    existingRoom.roomNum = roomNum || existingRoom.roomNum;
  
    existingRoom.floor = floor || existingRoom.floor;
    existingRoom.status = status || existingRoom.status;

    const updatedRoom = await existingRoom.save();

    return res.status(200).json({
      message: "Room updated successfully",
      data: updatedRoom,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



// All room
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await RoomManagement.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Rooms fetched successfully",
      data: rooms,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Single room


export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await RoomManagement.findById(id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    return res.status(200).json({
      message: "Room fetched successfully",
      data: room,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



// Cards stats 

export const roomStats=async(req,res)=>{
  try{

    const availableCount=await RoomManagement.countDocuments({status:"Available"})
     const allocatedCount=await RoomManagement.countDocuments({status:"Allocated"})
      const totalRoomCount=await RoomManagement.countDocuments()

    return res.json({
      totalRooms:totalRoomCount,
      available: availableCount,
      allocated: allocatedCount
     })
  }
  catch(error){
   return res.status(500).json({message:error.message})
  }
}




// Pagination api
export const pagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const role = req.query.role || "all";
    const search = req.query.search || "";

    const skip = (page - 1) * limit;
   const filter = {};
  

   
    if (search.trim() !== "") {
      filter.$or = [
      
        { roomNum: { $regex: search, $options: "i" } },
        { floor: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    const rooms = await RoomManagement.find(filter).sort({roomNum:1})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await RoomManagement.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return res.json({
      page,
      limit,
      total,
      totalPages,
      data: rooms,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};