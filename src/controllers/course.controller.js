import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import {ApiResponse } from "../utils/ApiResponse"
import { Register } from "../models/registration.models.js";
import { Student } from "../models/student.models.js";
import {Course} from "../models/courses.models.js"
import { Instructor } from "../models/instructor.models.js";
import { Video } from "../models/videos.models.js";

const registerToCourse = asyncHandler(async(req, res) => {
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
    const { name, description, thumbnail } = req.body;

    if ( 
        [name, description, thumbnail].some((field) =>
        String(field).trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    const course = await Course.create({
        name,
        description,
        thumbnail,
        instructorID: req.instructor._id
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

const getCourseDetails = asyncHandler(async(req, res) => {
    const { courseId } = req.params

    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    const videos = await Video.find({ courseID: courseId })

    const courseDetails = {
        thumbnail: course.thumbnail,
        name: course.name,
        description: course.description,
        videos:  videos.map(video => ({ url: video.videoFile, title: video.title }))
    }

    return res.status(200).json(new ApiResponse(200, courseDetails, "Course details fetched successfully"))
})

const getAllCourse = asyncHandler(async(req, res) => {
    const courses = await Course.find();

    if (courses.length === 0) {
        throw new ApiError(404, "No courses found");
    }

    const courseInfo = await Promise.all(courses.map(async (course) => { 
        return {
        name: course.name,
        description: course.description,
        thumbnail: course.thumbnail,
        }
    }))

    return res.status(200).json(new ApiResponse(200, courseInfo, "Course details fetched successfully"))
})