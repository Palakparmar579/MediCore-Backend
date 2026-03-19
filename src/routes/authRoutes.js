import express from 'express';
import { login, register,getRoles, getRolesById,editUser,deleteUser} from '../controllers/controllerAuth.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router =express.Router();

router.post("/register",authMiddleware,register);
router.post("/login",login)
router.get('/getUser',getRoles)
router.get('/get/:id',getRolesById)
router.put('/edit-user/:id',editUser)
router.delete('/deleteUser/:id',deleteUser)
export default router;



