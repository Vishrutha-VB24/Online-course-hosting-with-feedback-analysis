import mongoose, { Schema, Types } from "mongoose";
const courseSchema = new Schema({
    name:{
       type:String,
       required:true, 
    },
    
    instructorID:{
        type: Schema.Types.ObjectId,
        ref:"Instructor",
        required:true,
    },
    duration:{
        type: Number,
        required: true,
    },
    thumbnail:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },  
    firstVideo:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }

    
},
{
    timestamps:true
})


export const Course = mongoose.model("Course",courseSchema)

