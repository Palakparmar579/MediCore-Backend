import express from 'express'
import dotenv from 'dotenv'
 dotenv.config();
 console.log("MONGO_URI:", process.env.MONGO_URI);
import cors from 'cors'
// import userRoutes from './routes/user.js'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import uploadRoutes from './routes/uploadRoute.js'
// Step 1 : Config dotenv(.env file is activated in this)
 // Step 2:  create express file()
 const app=express()
 // Step 3: Add middleware
app.use(express.json())


// Add cors  (Frontend (React / Angular etc.) ko backend se baat karne dena.)
app.use(cors());  

//Step 6: Connect MongoDB

connectDB();
// mongoose.connect(process.env.Mongo_url)
// .then(()=>console.log("DB connected successfully"))
// .catch((err)=>console.log(err))

 // Step 7: connect routes
app.use("/api/auth",authRoutes)
app.use("/api/upload",uploadRoutes)
//Step 8: Test Route
 app.get("/",(req,res)=>{
     res.send("Backend Running Successfully")
 })

// Step 9: Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
