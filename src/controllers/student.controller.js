import { asyncHandler } from "../utils/asyncHandler.js"

const registerStudent = asyncHandler( async (req, res) => {
    res.status(200).json({
        message:"ok"
    })
})

export {registerStudent}