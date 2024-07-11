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

// /feeback/:courseid
/*
step 1 verfity student
step 2 verfiy if the student is registered to the course
step 3 very the course id
step 4 send request to django server
setep 5 using hte feebacck text and rating form django create feedback 
step 6 check if the feeback is created correctly
step 7 send appropritate response
*/


/* /feedback/all/:courseid
no verfy rerquired 
verfy courseid 
fetch all feedback and send it back inrespaonse

*/
