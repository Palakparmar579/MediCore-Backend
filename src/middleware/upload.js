import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage=new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder:"project-profile",
    allowed_formats:["jpg","png","jpeg"]
  },
});
const upload=multer({storage});
export default upload;


// //Multi storage 
// export const multiUpload=upload.array("images",5)



// const storage=new CloudinaryStorage({
//    cloudinary:cloudinary,
//    params:{
//    folder:"video",
//    resource_type:"video",
//    allowed_formats:["mp4", "mov", "avi", "mkv"]
//    },

// })
// const upload=multer({storage})
// export const singleUpload=upload.single("video")