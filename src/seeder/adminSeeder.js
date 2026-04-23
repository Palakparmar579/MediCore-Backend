import connectDB from "../config/db.js";
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();
const userSeed =async ()=>{
    try{
      await connectDB();
      const userExist=await User.findOne({email:"admin043@yopmail.com"})

      if(userExist){
        console.log("ALready exist")
        process.exit();
      }
      const hasPassword= await bcrypt.hash("Admin@043",10)
      await User.create({
        name:"Palak",
        email:"admin043@yopmail.com",
        password:hasPassword,
        age:"22",
        description:"Hii My name is Palak"
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