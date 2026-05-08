import express from "express";
import { getNurseDashboard } from "../../controllers/Nurses/nurseController.js";
import {protect} from '../../middleware/authMiddleware.js'
const router=express.Router()

router.get("/getNurseDashboard",protect,getNurseDashboard)

export default router;