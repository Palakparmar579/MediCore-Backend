import express from 'express';
import { register ,getAppointment,pagination} from "../../controllers/Patient/patientController.js";

const router =express.Router();

router.post("/register",register);
router.get("/getAppointment",getAppointment);
router.get("/pagination",pagination)
export default router;