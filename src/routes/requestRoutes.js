import express from "express";
import {forgetRequest,getRequest, updateRequest,pagination} from '../controllers/controllersRequest.js'
import authMiddleware from "../middleware/authMiddleware.js";
const router=express.Router()
 router.post('/forgetRequest',forgetRequest)
 router.get("/pagination",pagination)
 router.get('/getRequest',getRequest)
 router.post('/updateRequest',authMiddleware,updateRequest)
 export default router