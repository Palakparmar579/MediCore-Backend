import UserRequest from "../models/request.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import sendEmail from "../services/emailService.js";
export const forgetRequest=async(req,res)=>{
   try{
     const {email}=req.body;
     const user= await UserRequest.findOne({email,status:"pending"})
     if(user){
      return  res.status(400).json({message:"Request already sent "})
     }
     const userRole=await User.findOne({email})
     if (!userRole) {
      return res.status(404).json({
        message: "No account found with this email",
      });
    }
     const role=userRole.role;
     if(role==="admin"){
       return res.status(401).json({
            message:"Password reset request is not applicable for admin accounts"
        })
     }
     const newUser=await UserRequest.create({
        email,
        status:"pending",
        role
     })
     res.status(200).json({message:"Request send successfully",data:newUser})
   }
   catch(error){
  res.status(500).json({message:error.message})
   }
}

export const getRequest=async(req,res)=>{
    try{
       const user=await UserRequest.find()
       res.status(200).json(user)
    }
    catch(error){
      res.status(500).json({message:error.message})
    }
} 

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

export const updateRequest=async(req,res)=>{
    try{
        const {id, action}=req.body;
        const request= await UserRequest.findById( id)
        console.log(request)
        console.log(request)
        if(!request){
           return res.status(401).json({message:"Request not found"})
        }
        request.status=action;
        await request.save();
        const user= await User.findOne({email: request.email})
        if(!user){
          return res.status(401).json({message:"user not found"})
        }
        if(action==="accepted"){
           const generatePass=generateRandomPass(10)
           const passwordHash=await bcrypt.hash(generatePass,10)
          user.password=passwordHash;
          await user.save();
            await sendEmail({
               to:request.email,
               subject:"Your Account Approved",
               html:`<h3>Your request has been approved</h3>
      <p>Email: ${request.email}</p>
      <p>Password: ${generatePass}</p>`
            })
        }
        else if(action==="rejected"){
            await sendEmail({
                    to: request.email,
    subject: "Your Request Was Not Approved",
    html: `
      <h3>Request Not Approved</h3>
      <p>Unfortunately, your password reset request has been rejected.</p>
      <p>Please contact support if you think this is a mistake.</p>
    `
            })
            
        }
          res.json({ message: `Request ${action} successfully` });
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}



export const pagination=async(req,res)=>{
  try{
const page=parseInt(req.query.page);
const limit=parseInt(req.query.limit);
const skip=(page-1)*limit;
const users=await UserRequest.find({role:{$ne:"admin"}}).skip(skip).limit(limit).sort({createdAt:-1})
const total=await UserRequest.countDocuments({role:{$ne:"admin"}})
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
