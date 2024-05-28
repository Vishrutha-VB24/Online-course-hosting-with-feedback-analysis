import mongoose from "mongoose"
const instructorSchema = new mongoose.Schema(
    {
        instructor_name: { type:String, required:true},
        email: {type:String, required:true},
        password: {type:String, required:true},
        phone_number: { type:String },
        specialization: { type:String },
        qualification: { type:String },
        experience: { type:String },
        courses: {type:[String] },

        current_course:{ type:String},
    }, {timestamps: true}
)
export const Instructor = mongoose.model("Instructor", instructorSchema)