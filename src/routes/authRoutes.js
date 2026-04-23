import express from 'express';
import { login, register,getRoles, getRolesById,editUser,deleteUser, pagination,getDashboardStats,toggleUserStatus, resendPass,
    updateProfile,
    getMyProfile,
    tokenVerify} from '../controllers/controllerAuth.js';
import {protect} from '../middleware/authMiddleware.js';

const router =express.Router();

router.post("/register",protect,register);
router.post("/login",login)
router.get('/getUser',getRoles)
router.get('/get/:id',getRolesById)
router.put('/edit-user/:id',editUser)
router.delete('/deleteUser/:id',protect,deleteUser)
router.get("/pagination",pagination)
router.get("/dashBoardStats",getDashboardStats)
router.put("/toggleStatus/:id",protect,toggleUserStatus)
router.post("/resendPass/:id",protect,resendPass)
router.get("/getMyProfile", protect, getMyProfile)
router.put("/updateProfile",protect,updateProfile)
router.get("/tokenVerify",tokenVerify)
export default router;



