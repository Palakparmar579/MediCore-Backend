import express from "express";
import { editUser, getUser, register ,deleteUser,toggleUserStatus,pagination,getDashboardStats} from "../controllers/controllerDepartment.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();
router.post("/registerDep",authMiddleware,register);
router.put("/editDep/:id",editUser);
router.get("/getDep",getUser);
router.delete("/deleteDep/:id",deleteUser);
router.put("/toggleStatus/:id",authMiddleware,toggleUserStatus)
router.get("/pagination",pagination)
router.get("/dashBoardStats",getDashboardStats)
export default router;