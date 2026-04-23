
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import AssignDept from '../models/AssignDept.js';
import sendEmail from '../services/emailService.js';
import { resetPasswordTemplate,accountCreatedTemplate} from "../../utils/emailTemplates.js";
// Generate Random password


const generateRandomPass = (length = 10) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@!#$&";

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const number = "0123456789";
  const special = "@!#$&";

  let password = "";

  //  ensure required characters
  password += lower[Math.floor(Math.random() * lower.length)];
  password += upper[Math.floor(Math.random() * upper.length)];
  password += number[Math.floor(Math.random() * number.length)];
  password += special[Math.floor(Math.random() * special.length)];

  //  fill remaining length
  for (let i = password.length; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
};

// Register a new user
export const register = async (req, res) => {
  console.log("REQ BODY:", req.body);
  try {
    const { name, email, role, age,phone,experience, address, bio,department,deptNum,dob } = req.body;
  
    if (!name || !email || !role || !age ) {
      return res.status(400).json({
        message: "Not all fields have been entered.",
      });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists.",
      });
    }

    const generatePass = generateRandomPass(10);
    const passwordHash = await bcrypt.hash(generatePass, 10);

    const savedUser = await User.create({
      role: role || "patient",
      name,
      age,
      email,
      password: passwordHash,
      phone,
      experience,
      address,
      bio,
     department,
     deptNum
    });


     if (role === "doctor" || role === "nurse") {
      const assignDept = await AssignDept.findOne({ department });

      if (assignDept) {
        if (role === "doctor") {
          assignDept.doctors.push(savedUser._id);
        } else if (role === "nurse") {
          assignDept.nurses.push(savedUser._id);
        }
        await assignDept.save();

        await User.findByIdAndUpdate(savedUser._id, {
      department: assignDept._id,
      deptNum: assignDept.deptNum,
    });
      }
    }
  
    try {
      await sendEmail({
  to: email,
  subject: "Your MediCore Account Details",
  html: accountCreatedTemplate(name, email, generatePass),
});
    } catch (err) {
      console.log("Email error:", err.message);
    }

    res.status(201).json(savedUser);
  } catch (err) {
    console.log("REGISTER ERROR:", err.message); // ✅ debug
    res.status(500).json({ message: err.message });
  }
};


// Resend Password 

export const resendPass=async(req,res)=>{

  try{
    const user=await User.findById(req.params.id);
    if(!user){
    return  res.status(404).json({message:"User not found"})
    }
    const newPassGenerate=generateRandomPass(10)
    const passwordHash = await bcrypt.hash(newPassGenerate, 10);
    
     await User.findByIdAndUpdate(req.params.id, {
      password: passwordHash,
    });

    try{
   await sendEmail({
  to: user.email,
  subject: "Your account password",
 html: resetPasswordTemplate(user.name, newPassGenerate),
});
    }
    catch(error){
      res.status(500).json({message:error.message})
    }
    res.status(200).json({message:"Password sent successfully"})
    
  }
  catch(error){
     res.status(500).json({message:error.message})
  }
}

// Login--------------------------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Not all fields have been entered.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials.",
      });
    }
if(user.status==="inactive"){
 return res.status(403).json({message:"Your account is inactive. Please contact admin."})
}
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials.",
      });
    }

   
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const {name ,phone,experience, address, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name: name?.trim(), 
       phone: phone?.trim(),
       experience:experience?.trim(),
       
       address:address,
       bio:bio
       },

      { new: true }
    ).select("-password");

 
    res.status(200).json({
  success: true,
  user
});



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRoles = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getRolesById = async (req, res) => {
    const {id}=req.params
    try {
        const users = await User.findById(id); 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




// For whole data of particular role
export const getMyProfile = async (req, res) => {
  try {
const user = await User.findById(req.user.id)
  .select("-password");   
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    res.json({
      success: true,
      data: user,
      
    });

  } catch (error) {
  
    res.status(500).json({ message: "Server error" });
  }
};

 // 

export const editUser = async (req, res) => {
    try {

         const { id } = req.params;
        const { name, email, role, age} = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
                role,
                age
              
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


export const deleteUser=async(req,res)=>{
   try{
       const role=await User.findByIdAndDelete(req.params.id)
       res.status(200).json({message:"Delete successfully"})
   }

   catch(error){
     res.status(500).json({message:error.message})
   }
}

// Pagination api
export const pagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const role = req.query.role || "all";
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    let filter = {
      role: { $ne: "admin" },
    };

    
    if (role !== "all") {
      filter.role = role;
    }

   
    if (search.trim() !== "") {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return res.json({
      page,
      limit,
      total,
      totalPages,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getDashboardStats=async(req,res)=>{
  try{
   const doctorCount=await User.countDocuments({role:"doctor"});
    const nurseCount=await User.countDocuments({role:"nurse"})
     const patientCount=await User.countDocuments({role:"patient"})
      const totalCount=await User.countDocuments({role:{$ne:"admin"}})

    return res.json({
      total:totalCount,
      doctor:doctorCount,
      nurse: nurseCount,
      patient:patientCount
     })
  }
  catch(error){
   return res.status(500).json({message:error.message})
  }
}

export const toggleUserStatus=async(req,res)=>{
  try{
     const user=await User.findById(req.params.id);
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


// Token verification

export const tokenVerify=async(req,res)=>{
  const token =req.headers.authorization.split(" ")[1]
try{
  jwt.verify(token,process.env.JWT_SECRET)
  res.json({valid:true})
}
catch(error){
  res.json({valid:false})
}
}