import express from "express";
import {roomManagementForm ,updateRoomManagement,getAllRooms, getRoomById, roomStats,toggleStatus, pagination} from '../controllers/controllerRoomManagt.js'
import { protect } from "../middleware/authMiddleware.js";
import {getDeptById,getDept, assignRoom, getAllAllocations,paginationAllocation,getMyAllocations} from "../controllers/roomAllocationController.js"


const router=express.Router();
router.post("/roomManagement",protect,roomManagementForm)
router.put("/roomManagementEdit/:id",protect, updateRoomManagement);
router.get("/roomAll",protect, getAllRooms);
router.get("/roomSingle/:id",protect, getRoomById);
router.get("/roomStats",roomStats)
router.get("/pagination",protect,pagination)
router.put("/toggleStatus/:id",protect,toggleStatus)


// Room Allocation routes
router.get("/getDept",protect,getDept)
router.get("/getDeptById/:id",protect,getDeptById)
router.post("/assignRoom",protect,assignRoom)
router.get("/getAllocations",protect,getAllAllocations)
router.get("/paginationAllocation",protect,paginationAllocation)
router.get("/getMyAllocations",protect,getMyAllocations)

export default router;