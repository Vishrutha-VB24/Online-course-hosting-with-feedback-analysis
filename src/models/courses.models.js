import mongoose, { Schema, Types } from "mongoose";
const courseSchema = new Schema({
    name:{
       type:String,
       required:true, 
    },
    id:{
        type:String,
        required:true, 
     },
    instructor:{
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
        

    
},
{
    timestamps:true
})


export const Course = mongoose.model("Course",courseSchema)

