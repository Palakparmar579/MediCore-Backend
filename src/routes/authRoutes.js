import express from 'express';
import { login, register,getRoles, getRolesById,editUser,deleteUser, pagination,getDashboardStats,toggleUserStatus, resendPass} from '../controllers/controllerAuth.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router =express.Router();

router.post("/register",authMiddleware,register);
router.post("/login",login)
router.get('/getUser',getRoles)
router.get('/get/:id',getRolesById)
router.put('/edit-user/:id',editUser)
router.delete('/deleteUser/:id',deleteUser)
router.get("/pagination",pagination)
router.get("/dashBoardStats",getDashboardStats)
router.put("/toggleStatus/:id",authMiddleware,toggleUserStatus)
router.post("/resendPass/:id",authMiddleware,resendPass)
export default router;



