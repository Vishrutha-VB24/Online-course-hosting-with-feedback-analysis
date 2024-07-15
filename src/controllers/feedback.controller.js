import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
import { Register } from "../models/registration.models.js";
import { Feedback } from "../models/feedback.models.js";

const newfeedback = asyncHandler(async (req, res) => {
    const { courseID } = req.params;
    const {feedback} = req.body;
    if (!req.student) {
        throw new ApiError(401, "Unauthorized student");
    }

    const registered = await Register.findOne({courseID, studentID: req.student._id});
    if(!registered){
        res.status(401).json(new ApiError(401, "Student is not registered to the course"));
    }
        
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/reviews/", {"review": feedback});
        const {predicted_rating: rating} = response.data

        const feedbackObj = await Feedback.create({
            text: feedback,
            course: courseID,
            studentId: req.student._id,
            label: rating
        })
        const f = await Feedback.findById(feedbackObj._id)
        console.log(f)
        console.log(feedbackObj)
        if(!feedbackObj){
            res.status(500).json("Something went wrong");
        }
        res.status(response.status).json(new ApiResponse(response.data));
        console.log(response.data.predicted_rating)
        
    } catch (error) {
        throw new ApiError(error.response ? error.response.status : 500, error.message);
    }


});



export {
    newfeedback
};


