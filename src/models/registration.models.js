import mongoose, { Schema } from "mongoose";

const registerSchema = new Schema({
    courseID: {
        type: String,
        required: true,

    },
    studentID: {
        type: String,
         required: true,
    }
    },{
        timestamps:true
    }
)

export const Register = mongoose.models("Register",registerSchema)