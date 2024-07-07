import mongoose from "mongoose"
import {Video} from "../models/videos.models.js"
import { Student } from "../models/student.models.js"
import { Instructor } from "../models/instructor.models.js"
import { Course } from "../models/courses.models.js"
import { Register} from "../models/registration.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const uploadVideo = asyncHandler(async(req,res,next)=>{
    
    if(!req.instructor){
        throw new ApiError(401,"Invalid Instructor")
    }
    const {course_id,title,description} = req.body;
    if(
        [course_id,title,description].some((field)=>field?.trim()==="")
    )
    
    {
        throw new ApiError(404,"All fields are required")
    }
    const _id = req.instructor_id;
    const course = await Course.findOne({
        $and:[{course_id},{_id}]
    
    })
    if(!course){
        throw new ApiError(404,"course not found")
    }


    const videoLocalPath = req.files?.video[0]?.path;

    if(!videoLocalPath){
        throw new ApiError(400,"videoLocalPath not found")
    }
    const video = await uploadOnCloudinary(videoLocalPath);

    if(!video){
        throw new ApiError(500,"video not uploded successfully!!!")
    }


    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if(!thumbnailLocalPath){
        throw new ApiError(400,"videoLocalPath not found")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    
    if(!thumbnail){
        throw new ApiError(500,"thumbnail not uploded successfully!!!")
    }
    



    const videoOBJ = await Video.create({
        videoFile:video.url,
        thumbnail:thumbnail.url,
        title:title,
        description:description,
        duration:video.duration,
        course_id:course._id
    })
    const createdVideo = await Video.findById(videoOBJ._id)
    
    if(!createdVideo){
        throw new ApiError(500,"Something want wrong ")
    }

    return res.status(201).json(
        new ApiResponse(200, createdVideo, "Video upload successfully")
    )

})

//get video function
//1.verfy student object is there in the requst. 2.videoid correct or not 3.exraact coures id from videoObjet check if there is an object in regesration model student id and courseid 5.if present video url,description
const getVideo = asyncHandler(async (req, res, next) => {
    if (!req.student) {
        throw new ApiError(401, "Invalid Student");
    }

    const { id: video_id } = req.params;
    if (!video_id || video_id.trim() === "") {
        throw new ApiError(404, "Video ID is required");
    }

    const video = await Video.findById(video_id);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const courseID = video.courseID;
    const student_id = req.student._id;
    const registration = await Register.findOne({$and:[{courseID},{student_id}]});
    
    if (!registration) {
        throw new ApiError(403, "Student is not registered for this course");
    }

    return res.status(200).json(
        new ApiResponse(200, {
            video_url: video.videoFile,
            description: video.description,
            title: video.title,
            thumbnail: video.thumbnail
        }, "Video details fetched successfully")
    );
});





// deleteVideo in this function 1.Instructor or not 2.video_id present or not 3.from videoOBJ remove course_id 4.Finde course owner then delete video and return the message
const deleteVideo = asyncHandler(async (req, res, next) => {
    if (!req.instructor) {
        throw new ApiError(401, "Invalid Instructor");
    }

    const { id: video_id } = req.params;
    if (!video_id || video_id.trim() === "") {
        throw new ApiError(404, "Video ID is required");
    }

    const video = await Video.findById(video_id);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const courseID = video.courseID;
    const instructor_id = req.instructor._id;
    const course = await Course.findOne({ _id: courseID, instructor_id });
    if (!course) {
        throw new ApiError(403, "You do not have permission to delete this video");
    }

    await Video.deleteOne({ _id: video_id });

    return res.status(200).json(
        new ApiResponse(200, null, "Video deleted successfully")
    );
});




export { uploadVideo,getVideo,deleteVideo }