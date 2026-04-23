import express from "express";
import { getAppointmentByDoctor,getDoctorDashboard,updateProfile } from "../../controllers/Doctor/Controllerappointment.js";
import { protect } from "../../middleware/authMiddleware.js";
const router=express.Router()

router.get("/getAppointmentByDoctor/:id", getAppointmentByDoctor);
router.put("/updateProfile",protect,updateProfile)
router.get("/getDoctorData",protect,getDoctorDashboard)
export default router;