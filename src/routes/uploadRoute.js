import express from "express"

//import { multiUpload } from "../middleware/upload.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";
import { profileUpload } from "../controllers/ProfileUpload.js";


const router=express.Router();


router.post("/image", protect, upload.single("image"), profileUpload);

// Post api single upload

// router.post("/",upload.single("image"),async(req,res)=>{
//     try{
//         res.json(
//             {message:"image uploaded",
//               url:req.file.path
//             })
//     }
//      catch(err){
//                 res.status(500).json({error:err.message})
//             }
//})


//-----------------------------------Storing multiple images ---------------------------------
// router.post("/",multiUpload,(req,res)=>{
//     try{
//     const imagesUrls=req.files.map(file=>file.path);
//     res.json(
//             {message:"image uploaded",
//               images:imagesUrls
//             })
//         }
//         catch(err){
//    res.status(500).json({error:err.message})
//         }
// })


//-------------------------Upload single video-----------------------------------------

// router.post('/',singleUpload,async(req,res)=>{
//      try{
//         res.json({
//             message:"video uploaded successfully",
//             videoUrl:req.file.path
//         })
//      }
//      catch(err){
//         res.status(500).json({error:err.message})
//      }
// })

export default router;