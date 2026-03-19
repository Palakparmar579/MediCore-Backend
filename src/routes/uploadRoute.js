import express from "express"
//import upload from "../middleware/upload.js"
//import { multiUpload } from "../middleware/upload.js";
import { singleUpload } from "../middleware/upload.js";
const router=express.Router();

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
// })


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

router.post('/',singleUpload,async(req,res)=>{
     try{
        res.json({
            message:"video uploaded successfully",
            videoUrl:req.file.path
        })
     }
     catch(err){
        res.status(500).json({error:err.message})
     }
})

export default router;