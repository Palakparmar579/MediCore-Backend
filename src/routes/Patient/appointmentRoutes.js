import express from 'express';
import { register ,getAppointment,pagination,updateProfile,getAllAppointment,getBookedSlots,getAllocatedDoctorsByDepartment,getAppointmentById,getAcceptedAppointment} from "../../controllers/Patient/patientController.js";
import { protect } from '../../middleware/authMiddleware.js';
const router =express.Router();

router.post("/register",protect,register);
router.get("/getAppointment", protect, getAppointment);
router.get("/pagination",protect,pagination)
router.put("/updateProfile",protect,updateProfile)
router.get("/getBookedSlot",getBookedSlots)
router.get("/getAppointmentById/:id",getAppointmentById)
router.get("/getAllocatedDoctorsByDepartment/:id",getAllocatedDoctorsByDepartment)
router.get("/getAllAppointment",getAllAppointment)
router.get("/getAcceptedAppointment",getAcceptedAppointment)

export default router;