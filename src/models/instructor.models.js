import mongoose from "mongoose"
const instructorSchema = new mongoose.Schema(
    {
        instructor_name: { type:String, required:true},
        instructor_id: {type:String, required:true},
        email: {type:String, required:true},
        password: {type:String, required:true},
        phone_number: { type:String },
        bio: { type:String }, //specification, qualification, experience
        courses: {type:[String] },

        current_course:{ type:String},
    }, {timestamps: true}
)
export const Instructor = mongoose.model("Instructor", instructorSchema)