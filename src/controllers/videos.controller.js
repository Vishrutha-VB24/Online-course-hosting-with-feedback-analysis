import mongoose from "mongoose"
import {Video} from "../models/videos.models.js"
// import { Student } from "../models/student.models.js"
// import { Instructor } from "../models/instructor.models.js"
import { Course } from "../models/courses.models.js"
import { Register } from "../models/registration.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { User } from "../models/user.models.js"


const uploadVideo = asyncHandler(async(req,res)=>{
    if(!req.instructor){
        throw new ApiError(401,"Invalid Instructor")
    }
    const {course_id,title,description} = req.body;
    const {courseID} = req.params
    if([title,description, courseID].some((field)=>field?.trim()==="")){
        throw new ApiError(400, "Fields missing")
    }
    
    const _id = req.instructor_id;
    const course = await Course.findById(courseID);
    if(!course){
        throw new ApiError(404,"course not found")
    }
    console.log(course.instructorID)
    console.log(req.instructor._id)
    if(course.instructorID.toHexString() != req.instructor._id.toHexString()){
        throw new ApiError(404, 'Not authorized')
    }
    console.log(req.files)
    const videoLocalPath = req.files?.videoFile[0]?.path;
    if(!videoLocalPath){
        throw new ApiError(400,"videoLocalPath not found")
    }
    const video = await uploadOnCloudinary(videoLocalPath);

    if(!video){
        throw new ApiError(500,"video not uploded successfully!!!")
    }


    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if(!thumbnailLocalPath){
        throw new ApiError(400,"ThumbnailLocalPath not found")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    
    if(!thumbnail){
        throw new ApiError(500,"thumbnail not uploded successfully!!!")
    }
    



    const videoOBJ = await Video.create({
        videoFile: video.url,
        thumbnail: thumbnail.url,
        title: title,
        description: description,
        duration: video.duration,
        courseID: course._id
    })
    const createdVideo = await Video.findById(videoOBJ._id)
    
    if(!createdVideo){
        throw new ApiError(500,"Something want wrong ")
    }

    return res.status(201).json(
        new ApiResponse(200, createdVideo, "Video upload successfully")
    )

})

const getVideo = asyncHandler(async (req, res, next) => {
    if (!req.student) {
        throw new ApiError(401, "Invalid Student");
    }

    const { id: video_id } = req.params;
    console.log(video_id)
    if (!video_id || video_id.trim() === "") {
        throw new ApiError(404, "Video ID is required");
    }

    const video = await Video.findById(video_id);
    console.log(video)
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const courseID = video.courseID;
    const studentID = req.student._id;
    const registration = await Register.findOne({ studentID, courseID });
    
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

const deleteVideo = asyncHandler(async (req, res)=>{
    if(!req.instructor){
        throw new ApiError(401, "not authorized")
    }
    const video = await Video.findById(req.params.id);
    if(!video){
        throw new ApiError(404, 'video not found')
    }
    const course = await Course.findById(video.courseID);

    if(!(course.instructorID == req.instructor._id)){
        throw new ApiError(404, "not authorized")
    }

    const result = await Video.deleteOne({_id: video._id});

    if (result.deletedCount === 1) {
        console.log(`Successfully deleted video with id ${videoId}`);
    } else {
        console.log(`No video found with id ${videoId}`);
    }

    res.status(200).json(new ApiResponse(200, 'video delete succesfully'))
})





export { uploadVideo,getVideo, deleteVideo }