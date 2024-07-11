import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const newfeedback = asyncHandler(async (req, res) => {
    const { courseID } = req.params;
    const {feedback} = req.body;
    // if (!req.student) {
    //     throw new ApiError(401, "Unauthorized student");
    // }

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/reviews/", {"review": feedback});

        // Handle the response from the Django server
        res.status(response.status).json(new ApiResponse(response.data));
    } catch (error) {
        // Handle error from the request
        throw new ApiError(error.response ? error.response.status : 500, error.message);
    }


});



export {
    newfeedback
};


