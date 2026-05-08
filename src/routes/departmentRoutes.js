import express from "express";
import { editUser, getUser, register ,deleteUser,toggleUserStatus,pagination,getDashboardStats,getAllDepartment} from "../controllers/controllerDepartment.js";
import {protect }from "../middleware/authMiddleware.js";

const router=express.Router();
router.post("/registerDep",protect,register);
router.put("/editDep/:id",editUser);
router.get("/getDep",getUser);
router.delete("/deleteDep/:id",deleteUser);
router.put("/toggleStatus/:id",protect,toggleUserStatus)
router.get("/pagination",pagination)
router.get("/dashBoardStats",getDashboardStats)
router.get("/getDepartment",getAllDepartment)
export default router;