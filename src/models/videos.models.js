import mongoose, { Schema, Types } from "mongoose";

const videoSchema = new Schema(
    {
        videoFile:{
            type:String,
            required:true
        },
        thumbnail:{
            type:String,
            required:true//cloudnary
        },
        title:{
            type:String,
            required:true//cloudnary
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        courseID:{
            type:Schema.Types.ObjectId,
            ref:"Course"
        },
    },
    {timestamps:true}
)





export const Video = mongoose.model("Video",videoSchema)
