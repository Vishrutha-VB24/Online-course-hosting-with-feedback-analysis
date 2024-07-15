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
        type: Number,
        enum: [1, 2, 3, 4, 5]
    }
}, {timestamps: true})

export const Feedback = mongoose.model("Feeback", feedbackSchema);
