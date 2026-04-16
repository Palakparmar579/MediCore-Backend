import DoctorDep from "../models/department.js"

// POST API
export const register = async (req, res) => {
  try {
    const {department,description } = req.body;

    if (!department || !description) {
      return res.status(400).json({
        message: "Not all fields have been entered.",
      });
    }

    const deptNum=Math.floor(Math.random()*10000)
     const existingUser = await DoctorDep.findOne({ department});
    if (existingUser) {
      return res.status(400).json({
        message: "An account with this department already exists.",
      });
    }
    const savedUser = await DoctorDep.create({
    department,
    description,
    deptNum
    });
    
    res.status(201).json(savedUser);
  } catch (err) {
    console.log("REGISTER ERROR:", err.message); 
    res.status(500).json({ message: err.message });
  }
};

// Edit Api

export const editUser = async (req, res) => {
    try {

         const { id } = req.params;
        const { department,description} = req.body;

        const updatedUser = await DoctorDep.findByIdAndUpdate(
            id,
            {
               
                department,
                description
            },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete API

export const deleteUser=async(req,res)=>{
   try{
       const role=await DoctorDep.findByIdAndDelete(req.params.id)
       res.status(200).json({message:"Delete successfully"})
   }

   catch(error){
     res.status(500).json({message:error.message})
   }
}

// Get APi

export const getUser = async (req, res) => {
    try {
        const users = await DoctorDep.find(); 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Pagination api
export const pagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    let filter = {};

    if (search.trim() !== "") {
      filter.$or = [
        { department: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const departments = await DoctorDep.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await DoctorDep.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return res.json({
      page,
      limit,
      total,
      totalPages,
      data: departments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};



// Toggle Status
export const toggleUserStatus=async(req,res)=>{
  try{
     const user=await DoctorDep.findById(req.params.id);
     if(!user){
     return res.status(400).json({message:"User not found"})
     }
     user.status=user.status==="active"?"inactive":"active"
     await user.save();
    return res.json({
      message:"Status updated",
      status:user.status
     })
  }
  catch(error){
   return res.status(500).json({message:error.message})
  }
}



export const getDashboardStats=async(req,res)=>{
  try{
   const activeCount=await DoctorDep.countDocuments({status:"active"});
    const inactiveCount=await DoctorDep.countDocuments({status:"inactive"})
   const departmentCount=await DoctorDep.countDocuments()


    return res.json({
     deptTotal:departmentCount,
     active:activeCount,
     inactive: inactiveCount,
     })
  }
  catch(error){
   return res.status(500).json({message:error.message})
  }
}