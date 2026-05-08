import express from "express";
import { getAppointmentByDoctor,getDoctorDashboard,updateProfile,submitPrescription ,AppointmentStats,generateReport,toggleAppointmentStatus,getAppointmentDetail} from "../../controllers/Doctor/Controllerappointment.js";
import { protect } from "../../middleware/authMiddleware.js";
const router=express.Router()

router.get("/getAppointmentByDoctor/:id", getAppointmentByDoctor);
router.put("/updateProfile",protect,updateProfile)
router.get("/getDoctorData",protect,getDoctorDashboard)
router.put("/submitPrescription/:id",submitPrescription)
router.put("/toggleAppointmentStatus/:id",toggleAppointmentStatus)
router.get("/getAppointmentDetail/:id",getAppointmentDetail)
router.post("/generateReport/:id", generateReport);
router.get("/AppointmentStats",AppointmentStats)
export default router;