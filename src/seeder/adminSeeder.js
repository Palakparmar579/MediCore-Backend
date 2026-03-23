import connectDB from "../config/db.js";
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();
const userSeed =async ()=>{
    try{
      await connectDB();
      const userExist=await User.findOne({email:"admin123@gmail.com"})

      if(userExist){
        console.log("ALready exist")
        process.exit();
      }
      const hasPassword= await bcrypt.hash("Admin@043",10)
      await User.create({
        name:"Palak",
        email:"admin043@gmail.com",
        password:hasPassword
      });
      console.log("Admin created successfully")
      process.exit()
}
catch (error){
    console.error(error)
    process.exit();
}
}
userSeed();