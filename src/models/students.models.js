import exp from "constants";
import mongoose, { Schema, Types } from "mongoose";
const studentSchema = new Schema({
    firstname:{
       Type:String,
       required:true, 
    },
    lastname:{
        Type:String,
        required:true, 
     },
     email:{
        Type:String,
        required:true,
     },
     Password:{
        Type:String,
        requred:true, 
     },
     phone:{
        Type:Number,
        required:true,
     },
     coursesApplied:[{
        coursesName:{
            Type:String,
            requred:true, 
        },
        duration:{
            Type:Number
        },

        

     }]
},
{
    timestamps:true
})


export const Students = mongoose.model("Students",studentSchema)
