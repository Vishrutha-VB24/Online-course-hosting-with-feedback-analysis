import mongoose from "mongoose"
const instructorSchema = new mongoose.Schema(
    {
        name: { type:String, required:true},
        userName: {type:String, required:true},
        email: {type:String, required:true},
        password: {type:String, required:true},
        phoneNumber: { type:String, required:true},
        bio: { type:String, required:true}, //specification, qualification, experience
    }, {timestamps: true}
)
export const Instructor = mongoose.model("Instructor", instructorSchema)


