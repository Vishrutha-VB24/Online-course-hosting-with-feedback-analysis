import {v2 as cloudinary } from "cloudinary"
import { response } from "express";
import fs from "fs"
       
cloudinary.config({ 
  cloud_name: 'process.env.CLOUDINARY_NAME', 
  api_key: 'process.env.CLOUDINARY_API_KEY', 
  api_secret: 'process.env.CLOUDINARY_API_SECRET' 
});

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null 
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        console.log("file is uploaded on cloudinary",response.url);
        fs.unlinkSync(localFilePath)// remove the locally saved temporary file
        return response
    }
    catch (error){
      fs.unlinkSync(localFilePath)// remove the locally saved temporary file as the upload operation had failed
      return null ;
    }
}


export{ uploadOnCloudinary }