import express from "express"
import { addAssignedDept, getAssignment,editAssignment, pagination,getDoctorsByDepartment } from "../controllers/assignDeptController.js"

const router = express.Router()
router.post("/addAssignment",addAssignedDept)
router.get("/getAssignment",getAssignment)

router.get("/doctors/:id", getDoctorsByDepartment);
router.get("/pagination",pagination)
router.put("/editAssignment/:id",editAssignment)
export default router;
