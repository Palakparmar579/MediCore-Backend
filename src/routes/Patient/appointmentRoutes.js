import express from 'express';
import { register ,getAppointment,pagination,updateProfile} from "../../controllers/Patient/patientController.js";
import { protect } from '../../middleware/authMiddleware.js';
const router =express.Router();

router.post("/register",register);
router.get("/getAppointment",getAppointment);
router.get("/pagination",pagination)
router.put("/updateProfile",protect,updateProfile)

export default router;