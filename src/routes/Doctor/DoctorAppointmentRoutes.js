import express from "express";
import { getAppointmentByDoctor } from "../../controllers/Doctor/Controllerappointment.js";
const router=express.Router()

router.get("/getAppointmentByDoctor/:id", getAppointmentByDoctor);

export default router;