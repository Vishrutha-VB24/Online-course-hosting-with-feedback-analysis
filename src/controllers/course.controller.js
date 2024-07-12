import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse } from "../utils/ApiResponse.js"
import { Register } from "../models/registration.models.js";
import {Course} from "../models/courses.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { User } from "../models/user.models.js";
import { Video } from "../models/videos.models.js";

const courseRegistration = asyncHandler(async(req, res) => {
    if (!req.student) {
        throw new ApiError(401, "Unauthorized student")
    }
    const course = await Course.findById(req.body.course_ID)
    if (!course) {
        throw new ApiError(404, "Invalid course ID")
    }
    const register = await Register.create({
        courseID: course._id,
        studentID: req.student._id
    })
    const createdRegister = await Register.findById(register._id)
    if (!createdRegister) {
        throw new ApiError(500, "Something went wrong in the server")
    }
    return res.status(201).json(new ApiResponse(200, createdRegister, "Registration successful"))
})

const createCourse = asyncHandler(async(req, res) => {
    if (!req.instructor) {
        throw new ApiError(401, "Unauthorized instructor")
    }
    const { name, description } = req.body;

    if ( 
        [name, description].some((field) =>
        String(field).trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    console.log(req.files)
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if(!thumbnailLocalPath){
        throw new ApiError(400,"thumbnail LocalPath not found")
    }
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if(!thumbnail){
        throw new ApiError(500," not uploded successfully!!!")
    }

    
    const course = await Course.create({
        name,
        description,
        thumbnail:thumbnail?.url || '',
        instructorID: req.instructor._id,
    })

    const createdCourse = await Course.findById(course._id)

    if (!createdCourse) {
        throw new ApiError(500, "Something went wrong in the server")
    }

    return res.status(201).json(new ApiResponse(201, course, "Course created successfully"))
})


const deleteCourse = asyncHandler(async(req, res) => {
    if (!req.instructor) {
        throw new ApiError(401, "Unauthorized instructor")
    }
    const { _id, instructorID } = req.body

    const existedCourse = await Course.findOne({
        $and:[{_id},{instructorID}]
   })

   if(!existedCourse){
    throw new ApiError(404, "Invalid course")
    }

    await Course.findByIdAndDelete(existedCourse._id);

    return res.status(200).json(new ApiResponse(200, null, "Course deleted successfully"));
})

const allCourses = asyncHandler(async(req,res) => {
    const courses = await Course.find();
    return res.status(200).json(new ApiResponse(200,courses,"ALL Courses fechted successflly"));
})



const courseInfo = asyncHandler(async (req, res)=>{
    if(!req.instructor){
        throw new ApiError(401, "Not an instructor")
    }
    const {id: courseID} = req.params;


    const course = await Course.findById(courseID);
    console.log(course)
    if(!course){
        throw new ApiError(404, "course not found")
    }

    const videos = await Video.find({ courseID: course._id });

    return res.status(200).json(new ApiResponse(200, {course, ...{videos}}, "Course Info fetching Succefully"))



})

const getCourse = asyncHandler(async (req, res)=>{
    const {id : courseID} = req.params

    const course = await Course.findById(courseID);

    if(!course){
        throw new ApiError(404, "COurse not found")
    }

    const videos = await Video.find({courseID: course._id})

    return res.status(200).json(new ApiResponse(200, {course, ...{videos}}, "Course Info fetching Succefully"))
})





export{
    courseRegistration,
    createCourse,
    deleteCourse,
    allCourses,
    courseInfo,
    getCourse
    
}
