import express from 'express'
import dotenv from 'dotenv'
 dotenv.config();
 console.log("MONGO_URI:", process.env.MONGO_URI);
import cors from 'cors'
// import userRoutes from './routes/user.js'
import connectDB from './config/db.js'

import uploadRoutes from './routes/uploadRoute.js'
import requestRoutes from './routes/requestRoutes.js'
import departmentRoutes from './routes/departmentRoutes.js'
import appointmentRoutes from './routes/Patient/appointmentRoutes.js'
import assignDeptRoutes from './routes/assignDeptRoutes.js'
import authRoutes from './routes/authRoutes.js'
import DoctorAppointmentRoutes from './routes/Doctor/DoctorAppointmentRoutes.js'
import roomManagtRoutes from './routes/roomManagtRoutes.js'
import nurseRoutes from './routes/Nurse/nurseRoutes.js'
// Step 1 : Config dotenv(.env file is activated in this)
 // Step 2:  create express file()
 const app=express()
 // Step 3: Add middleware
app.use(express.json())


// Add cors  (Frontend (React / Angular etc.) ko backend se baat karne dena.)
//app.use(cors());   //Cross-Origin Resource Sharing


const allowedOrigins = [
  "https://medi-core-dkui.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

// app.use(cors())

//Step 6: Connect MongoDB

connectDB();
// mongoose.connect(process.env.Mongo_url)
// .then(()=>console.log("DB connected successfully"))
// .catch((err)=>console.log(err))

 // Step 7: connect routes

 // Admin Routes--------------------------------------
app.use("/api/auth",authRoutes)
app.use("/api/upload",uploadRoutes)
app.use("/api/request",requestRoutes)
app.use("/api/department",departmentRoutes)
app.use("/api/assignment",assignDeptRoutes)
app.use("/api/room",roomManagtRoutes)



//Patient-----------------------------------------------
app.use("/api/appointmentPatient", appointmentRoutes);

// Doctor---------------------------------------------------------------
app.use("/api/doctorAppointment",DoctorAppointmentRoutes)



// Nurse---------------------------------------------------------------------
app.use("/api/nurse",nurseRoutes)

//Step 8: Test Route
 app.get("/",(req,res)=>{
     res.send("Backend Running Successfully")
 })

// Step 9: Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
