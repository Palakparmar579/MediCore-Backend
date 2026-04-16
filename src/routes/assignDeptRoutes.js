import express from "express"
import { addAssignedDept, getAssignment,editAssignment, pagination } from "../controllers/assignDeptController.js"

const router = express.Router()
router.post("/addAssignment",addAssignedDept)
router.get("/getAssignment",getAssignment)
router.get("/pagination",pagination)
router.put("/editAssignment/:id",editAssignment)
export default router;
