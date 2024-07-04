import mongoose, {Schema} from "mongoose";
import { type } from "os";

const feedbackSchema = new Schema({
    text:{
        type: String,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    label: {
        type: String,
        enum: ['positive', 'negative', 'neutral']
    }
}, {timestamps: true})