import mongoose, { Schema, Types } from "mongoose";
const courseSchema = new Schema({
    name:{
       type:String,
       required:true, 
    },
    
    instructorID:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    thumbnail:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
},
{
    timestamps:true
})


export const Course = mongoose.model("Course",courseSchema)

