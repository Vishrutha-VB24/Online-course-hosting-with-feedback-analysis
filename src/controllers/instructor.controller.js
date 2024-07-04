import { asyncHandler } from "../utils/asyncHandler.js";

const registerInstructor = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})